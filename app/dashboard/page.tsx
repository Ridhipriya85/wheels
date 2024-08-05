'use client';  // Add this directive at the top

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // Import Filler for area chart
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // Register Filler
);

interface GaugeChartProps {
  percentage: number;
  color: string;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ percentage, color }) => {
  const circumference = 2 * Math.PI * 15.9155;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold">{percentage}%</span>
      </div>
      <svg className="h-24 w-24" viewBox="0 0 36 36">
        <path
          className="text-gray-200"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.8"
        />
        <path
          className={color}
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

interface CardComponentProps {
  title: string;
  subtitle: string;
  image: string;
  color: string;
  defaultDropdown: string;
  initialPercentage: number;
}

const CardComponent: React.FC<CardComponentProps> = ({ title, subtitle, image, color, defaultDropdown, initialPercentage }) => {
  const [dropdownValue, setDropdownValue] = useState(defaultDropdown);
  const [percentage, setPercentage] = useState(initialPercentage);

  return (
    <Card className="w-full md:w-auto">
      <CardHeader className="flex flex-col space-y-2 pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {title}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-gray-600 border border-gray-300 rounded px-2 py-1">
              {dropdownValue} <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {['Daily', 'Weekly', 'Monthly'].map((value) => (
                <DropdownMenuItem key={value} onClick={() => setDropdownValue(value)}>
                  {value}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardTitle className="text-2xl font-bold">
          {subtitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <img src={image} alt={subtitle} className="h-24 w-24" />
        <div className="flex flex-col items-center">
          <GaugeChart percentage={percentage} color={color} />
        </div>
      </CardContent>
    </Card>
  );
};

const initialData = {
  labels: ['September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
  datasets: [
    {
      label: 'Dog Walking',
      data: [2, 3, 5, 4, 3, 5, 6, 4],
      borderColor: 'orange',
      backgroundColor: 'rgba(255, 165, 0, 0.2)',
      borderWidth: 2,
      fill: true, // Fill the area under the line
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 10,
      grid: {
        display: false, // Remove grid lines
      },
    },
    x: {
      grid: {
        display: false, // Remove grid lines
      },
    },
  },
};

export default function Page() {
  const [graphData, setGraphData] = useState(initialData);
  const [graphDropdownValue, setGraphDropdownValue] = useState('Monthly');
  const [selectedCase, setSelectedCase] = useState('Dog Walking');

  const handleGraphChange = (value: string) => {
    setGraphDropdownValue(value);
    // Update graphData based on the value
    if (value === 'Daily') {
      setGraphData({
        ...initialData,
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
          {
            ...initialData.datasets[0],
            data: [1, 2, 3, 4, 5, 6, 7],
          },
        ],
      });
    } else if (value === 'Weekly') {
      setGraphData({
        ...initialData,
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            ...initialData.datasets[0],
            data: [4, 3, 5, 6],
          },
        ],
      });
    } else if (value === 'Monthly') {
      setGraphData(initialData);
    }
  };

  const handleCaseChange = (caseType: string) => {
    setSelectedCase(caseType);
    // Update graphData based on the selected case
    if (caseType === 'Dog Walking') {
      setGraphData({
        ...initialData,
        datasets: [
          {
            label: 'Dog Walking',
            data: [2, 3, 5, 4, 3, 5, 6, 4],
            borderColor: 'orange',
            backgroundColor: 'rgba(255, 165, 0, 0.2)',
            borderWidth: 2,
            fill: true,
          },
        ],
      });
    } else if (caseType === 'Employee Escalated') {
      setGraphData({
        ...initialData,
        datasets: [
          {
            label: 'Employee Escalated',
            data: [1, 2, 2, 3, 4, 5, 6, 5],
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
            borderWidth: 2,
            fill: true,
          },
        ],
      });
    } else if (caseType === 'Client Escalated') {
      setGraphData({
        ...initialData,
        datasets: [
          {
            label: 'Client Escalated',
            data: [1, 1, 2, 2, 3, 3, 4, 4],
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
            borderWidth: 2,
            fill: true,
          },
        ],
      });
    }
  };

  return (
    <MainLayout meta={{ title: 'Dashboard' }}>
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <Tabs defaultValue="dashboard" className="space-y-4">
            <TabsContent value="dashboard" className="space-y-4">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                <CardComponent
                  title="CASE"
                  subtitle="DOG WALKING"
                  image="/images/Frame (2).png"
                  color="text-red-500"
                  defaultDropdown="Daily"
                  initialPercentage={25}
                />
                <CardComponent
                  title="CASE"
                  subtitle="EMPLOYEE ESCALATED"
                  image="/images/Frame (3).png"
                  color="text-green-500"
                  defaultDropdown="Weekly"
                  initialPercentage={50}
                />
                <CardComponent
                  title="CASE"
                  subtitle="CLIENT ESCALATED"
                  image="/images/Frame (4).png"
                  color="text-yellow-500"
                  defaultDropdown="Daily"
                  initialPercentage={20}
                />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <Card className="col-span-1">
                  <CardHeader>
                    <div className="flex justify-between items-center w-full">
                      <CardTitle>Total Cases</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center text-gray-600 border border-gray-300 rounded px-2 py-1">
                          {graphDropdownValue} <ChevronDown className="ml-1 h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {['Daily', 'Weekly', 'Monthly'].map((value) => (
                            <DropdownMenuItem key={value} onClick={() => handleGraphChange(value)}>
                              {value}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center space-x-4 mb-4">
                      <button
                        className={`px-4 py-2 rounded ${selectedCase === 'Dog Walking' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => handleCaseChange('Dog Walking')}
                      >
                        Dog Walking
                      </button>
                      <button
                        className={`px-4 py-2 rounded ${selectedCase === 'Employee Escalated' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => handleCaseChange('Employee Escalated')}
                      >
                        Employee Escalated
                      </button>
                      <button
                        className={`px-4 py-2 rounded ${selectedCase === 'Client Escalated' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => handleCaseChange('Client Escalated')}
                      >
                        Client Escalated
                      </button>
                    </div>
                    <Line data={graphData} options={options} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </MainLayout>
  );
}
