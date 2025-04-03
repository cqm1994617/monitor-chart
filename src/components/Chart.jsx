import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const EChartsWrapper = ({ 
  option,
  width = '100%',
  height = '13vw',
  theme,
  onEvents,
  style = {},
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current, theme);
      
      if (onEvents) {
        Object.entries(onEvents).forEach(([eventName, handler]) => {
          chartInstance.current?.on(eventName, handler);
        });
      }
    }

    return () => {
      chartInstance.current?.dispose();
    };
  }, [theme, onEvents]);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.setOption(option, true);
    }
  }, [option]);

  useEffect(() => {
    const handleResize = () => {
      chartInstance.current?.resize();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={chartRef}
      style={{
        width,
        height,
        ...style,
      }}
    />
  );
};

export default EChartsWrapper;