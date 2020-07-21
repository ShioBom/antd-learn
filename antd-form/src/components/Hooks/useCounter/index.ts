import { useState, useMemo } from "react";
import useCreation from '../useCreation';

interface Options {
  min?: number,
  max?: number,
};
interface Actions {
  inc: (delta?: number) => void,
  dec: (dalta?: number) => void,
  set: (value: number | ((c: number) => number)) => void,
  reset: () => void,
}
export default function Counter(initialValue: number = 0, options: Options = {}): [number, Actions] {
  const { min, max } = options;
  // get init value
  const init = useCreation(() => {
    if (typeof max === 'number') {
      return Math.min(max, initialValue);
    }
    if (typeof min === 'number') {
      return Math.max(min, initialValue);
    }
    return initialValue;
  }, []);
  console.log('init',init);
  // 这种写法的弊端是每次更改该hooks的值，init函数都会执行一次
  // const init = useCallback(
  //   () => {
  //     if (typeof max === 'number') {
  //       return Math.min(max, initialValue);
  //     }
  //     if (typeof min === 'number') {
  //       return Math.max(min, initialValue);
  //     }
  //     console.log('init run ....')
  //     return initialValue;
  //   },
  //   [],
  // )
  // let init = initialValue;
  // useEffect(() => {
  //   if (typeof max === 'number') {
  //     init = Math.min(max, initialValue);
  //     console.log(init)
  //     return;
  //   }
  //   if (typeof min === 'number') {
  //     init =  Math.max(min, initialValue);
  //     return;

  //   }
  //   console.log('init run ....')
  //   init = initialValue;
  //   return;
  // }, [])
  // const init = () => {
  //   if (typeof max === 'number') {
  //     return Math.min(max, initialValue);
  //   }
  //   if (typeof min === 'number') {
  //     return Math.max(min, initialValue);
  //   }
  //   console.log('init run ....')
  //   return initialValue;
  // }
  const [count, setCount] = useState(init);
  // const actions = {
  //   inc: (delta: number = 1) => {
  //     const data = count ? count : initialValue;
  //     setCount(data + delta);
  //   },
  //   dec: (delta: number = 1) => {
  //     const data = count ? count : initialValue;
  //     setCount(data - delta);
  //   },
  //   set: (value: number | ((c: number) => number)) => {
  //     const data = count || initialValue;
  //     setCount(data);
  //   },
  //   reset: () => {
  //     setCount(init);
  //   },
  // }
  const actions = useMemo(() => {
    const setValue = (value: number | ((c: number) => number)) => {
      setCount((c: number) => {
        // get target value
        let target = typeof value === 'number' ? value : value(c);
        if (typeof max === 'number') {
          target = Math.min(max, target);
        }
        if (typeof min === 'number') {
          target = Math.max(min, target);
        }
        return target;
      });
    };
    const inc = (delta: number = 1) => {
      setValue((c) => c + delta);
    };
    const dec = (delta: number = 1) => {
      setValue((c) => c - delta);
    };
    const set = (value: number | ((c: number) => number)) => {
      setValue(value);
    };
    const reset = () => {
      setValue(init);
    };
    return { inc, dec, set, reset };
  }, []);
  return [count, actions]
}