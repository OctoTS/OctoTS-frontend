import React from 'react';
import ChartCard from './ChartCard';
import VanillaOctoChart from './VanillaOctoChart';

const OctoDashboard = ({ data, layout, lang }) => {
  return (
    <main className="dashboard-grid">
      {layout.map((chartConfig, index) => {
        const engine = index % 2 === 0 ? 'echarts' : 'chartjs'; 
        const vanillaType = chartConfig.type === 'calendar' || chartConfig.type === 'stream' ? 'line' : 'bar';

        return (
          <ChartCard 
            key={`chart-${index}`} 
            title={chartConfig.title} 
            description={chartConfig.description} 
            library={`OctoTS (${engine})`}
          >
            <VanillaOctoChart 
              engine={engine}
              type={vanillaType}
              chartId={`chart-${index}`}
              title={chartConfig.title}
              mapping={chartConfig.mapping}
              data={data}
            />
          </ChartCard>
        );
      })}
    </main>
  );
};

export default OctoDashboard;