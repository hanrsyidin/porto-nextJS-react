'use client';

import React, { useEffect, useState } from 'react';
import ActivityCalendar, { Activity, ThemeInput } from 'react-activity-calendar';
import { Tooltip as ReactTooltip } from 'react-tooltip';

interface ApiResponse {
  totalContributions: number;
  activities: Activity[];
}

const gitHubDarkTheme: ThemeInput = {
  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'], // Level 0-4 untuk light mode
  dark: ['#161b22', '#01311F', '#034829', '#026E3E', '#009A56'], // Level 0-4 untuk dark mode
                                                                        // Atau GitHub klasik: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
};


export default function GitHubActivityCalendar() {
  const [data, setData] = useState<Activity[] | null>(null);
  const [totalContributions, setTotalContributions] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/github-contributions');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Error: ${response.status}`);
        }
        const result: ApiResponse = await response.json();
        setData(result.activities);
        setTotalContributions(result.totalContributions);
      } catch (err: any) {
        setError(err.message);
        console.error("Gagal mengambil aktivitas GitHub:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center p-4 rounded-lg bg-gray-800 text-zinc-900">Memuat kontribusi GitHub...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-400 rounded-lg bg-red-900 bg-opacity-30">Gagal memuat kontribusi: {error}</div>;
  }

  if (!data || data.length === 0) {
    return <div className="text-center p-4 rounded-lg bg-gray-800 text-zinc-900">Tidak ada data kontribusi.</div>;
  }

  return (
    <div className="p-4 md:p-6 bg-[#ffffff] text-zinc-900 rounded-lg shadow-lg max-w-full overflow-x-auto">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base sm:text-lg font-semibold">
          {totalContributions ?? '...'} kontribusi dalam setahun terakhir
        </h3>
      </div>
      <ActivityCalendar
        data={data}
        theme={gitHubDarkTheme}
        colorScheme="dark"
        blockSize={12}   
        blockMargin={3}  
        fontSize={14}      
        showWeekdayLabels 
        renderBlock={(block, activity) =>
          React.cloneElement(block, {
            'data-tooltip-id': 'contribution-tooltip',
            'data-tooltip-html': `${activity.count} kontribusi pada ${new Date(activity.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}`,
          })
        }
      />
      <ReactTooltip id="contribution-tooltip" />
      <div className="flex justify-between items-center mt-2 text-xs text-zinc-900">
        <a href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/viewing-contributions-on-your-profile#what-counts-as-a-contribution" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Pelajari cara GitHub menghitung kontribusi
        </a>
        <div className="flex items-center space-x-1">
            <span>Kurang</span>
            <span className="w-3 h-3 bg-[var(--color-calendar-graph-day-L0-bg)] rounded-sm"></span>
            <span className="w-3 h-3 bg-[var(--color-calendar-graph-day-L1-bg)] rounded-sm"></span>
            <span className="w-3 h-3 bg-[var(--color-calendar-graph-day-L2-bg)] rounded-sm"></span>
            <span className="w-3 h-3 bg-[var(--color-calendar-graph-day-L3-bg)] rounded-sm"></span>
            <span className="w-3 h-3 bg-[var(--color-calendar-graph-day-L4-bg)] rounded-sm"></span>
            <span>Lebih</span>
        </div>
      </div>
    </div>
  );
}