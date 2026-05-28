import { createContext, useContext, useState, useEffect } from 'react';
import { syncPlansState } from '../../data/plans';

const DemoStateContext = createContext();

const DEFAULT_STATE = {
  isGenesisCompleted: false,
  hasActivePlans: false,
  isDidVerified: false,
  showDebugBall: true,
};

export function DemoStateProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem('mio_demo_state');
      if (saved) {
        // 兼容原有的 localStorage 属性
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_STATE,
          ...parsed,
          // 如果原先本地已经有 did 验证，同步过来
          isDidVerified: parsed.isDidVerified ?? (localStorage.getItem('did_verified') === 'true'),
          isGenesisCompleted: parsed.isGenesisCompleted ?? (localStorage.getItem('genesisCompleted') === 'true'),
        };
      }
    } catch (e) {
      console.error('Failed to parse demo state:', e);
    }
    
    // Fallback: 检查原先的 local storage 散装字段进行初始化
    const did = localStorage.getItem('did_verified') === 'true';
    const genesis = localStorage.getItem('genesisCompleted') === 'true';
    return {
      ...DEFAULT_STATE,
      isDidVerified: did,
      isGenesisCompleted: genesis,
    };
  });

  // 更新全局状态，同时写入 localStorage，并且将散装变量也做双向绑定，确保与已有业务代码 100% 兼容
  const updateState = (newFields) => {
    setState((prev) => {
      const updated = { ...prev, ...newFields };
      localStorage.setItem('mio_demo_state', JSON.stringify(updated));
      
      // 双向绑定散装 localStorage，无缝兼容原有零散的业务逻辑
      if (newFields.isGenesisCompleted !== undefined) {
        localStorage.setItem('genesisCompleted', String(newFields.isGenesisCompleted));
        // 如果创世任务完成，自动点亮全部子任务
        if (newFields.isGenesisCompleted) {
          localStorage.setItem('tutorialCompleted', 'true');
          localStorage.setItem('did_verified', 'true');
          localStorage.setItem('device_connected', 'true');
          localStorage.setItem('isDeepAssessed', 'true');
          localStorage.setItem('firstPlanActivated', 'true');
          localStorage.setItem('nft_minted', 'true');
          localStorage.setItem('genesisStep', '4');
        } else {
          // 回滚到部分完成态，配合初始新手体验
          localStorage.setItem('tutorialCompleted', 'true');
          localStorage.setItem('did_verified', 'false');
          localStorage.setItem('device_connected', 'false');
          localStorage.setItem('isDeepAssessed', 'false');
          localStorage.setItem('firstPlanActivated', 'false');
          localStorage.setItem('nft_minted', 'false');
          localStorage.setItem('genesisStep', '1');
        }
      }
      
      if (newFields.isDidVerified !== undefined) {
        localStorage.setItem('did_verified', String(newFields.isDidVerified));
      }

      if (newFields.hasActivePlans !== undefined) {
        localStorage.setItem('firstPlanActivated', String(newFields.hasActivePlans));
      }

      // 实时同步静态 plans 数据
      syncPlansState();

      // 触发 storage 事件以唤醒各个子页面的原生渲染器
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('focus'));
      
      return updated;
    });
  };

  // 监听外部对散装变量的修改，保证多状态与已有本地存储的极致兼容
  useEffect(() => {
    const syncWithLocalStorage = () => {
      const did = localStorage.getItem('did_verified') === 'true';
      const genesis = localStorage.getItem('genesisCompleted') === 'true';
      
      // 同步 plans
      syncPlansState();
      
      setState(prev => {
        if (prev.isDidVerified !== did || prev.isGenesisCompleted !== genesis) {
          return {
            ...prev,
            isDidVerified: did,
            isGenesisCompleted: genesis
          };
        }
        return prev;
      });
    };

    window.addEventListener('storage', syncWithLocalStorage);
    window.addEventListener('focus', syncWithLocalStorage);
    return () => {
      window.removeEventListener('storage', syncWithLocalStorage);
      window.removeEventListener('focus', syncWithLocalStorage);
    };
  }, []);

  return (
    <DemoStateContext.Provider value={{ state, updateState }}>
      {children}
    </DemoStateContext.Provider>
  );
}

export function useDemoState() {
  const context = useContext(DemoStateContext);
  if (!context) {
    throw new Error('useDemoState must be used within a DemoStateProvider');
  }
  return context;
}
