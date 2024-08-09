'use client';
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, MoreHorizontal } from 'lucide-react';
import MainLayout from '@/components/layout/main-layout';
import { CalendarDateRangePicker } from '@/components/date-range-picker';


const breadcrumbItems = [{ title: 'Cases', link: '/dashboard/cases' }];

const casesData = [
  { caseId: '12', petName: 'Rabies', startDate: '01 Dec 2023', endDate: '01 Dec 2023', assignEmployee: 'Jim Carloss', currentStatus: 'Dog Walking' },
  { caseId: '13', petName: 'Distemper', startDate: '27 Jun 2024', endDate: '27 Jun 2024', assignEmployee: 'Jim Brown', currentStatus: 'Salon' },
  { caseId: '14', petName: 'Calicivirus', startDate: '16 Sep 2024', endDate: '16 Sep 2024', assignEmployee: 'Helen Brooks', currentStatus: 'Salon' },
  { caseId: '15', petName: 'Bordetella', startDate: '11 Dec 2024', endDate: '11 Dec 2024', assignEmployee: 'Helen Brooks', currentStatus: 'Veterinary' },
  { caseId: '16', petName: 'Rabies', startDate: '01 Dec 2023', endDate: '01 Dec 2023', assignEmployee: 'Jim Carloss', currentStatus: 'Dog Walking' },
  { caseId: '17', petName: 'Distemper', startDate: '27 Jun 2024', endDate: '27 Jun 2024', assignEmployee: 'Jim Brown', currentStatus: 'Pet Taxi' },
  { caseId: '18', petName: 'Calicivirus', startDate: '16 Sep 2024', endDate: '16 Sep 2024', assignEmployee: 'Helen Brooks', currentStatus: 'Salon' },
];

export default function CaseManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('By type');
  const [sortStatus, setSortStatus] = useState('');

  const filteredCases = casesData
    .filter((caseItem) =>
      caseItem.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.assignEmployee.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (filterType === 'Sort by status' && sortStatus) {
        return a.currentStatus.localeCompare(b.currentStatus);
      }
      return 0;
    });

  return (
    <MainLayout meta={{ title: 'Case Management' }}>
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Cases</h2>
            <div className="flex space-x-2 w-full max-w-3xl">
              <input
                type="text"
                placeholder="Search by pet name or assigned employee"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-2 flex-1"
              />
              <div className="hidden items-center space-x-2 md:flex">
                <CalendarDateRangePicker />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-600 border border-gray-300 rounded-xl px-4 py-2">
                  {filterType} <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterType('Sort by status')}>
                    Sort by status
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center">
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {['Dog Walking', 'Salon', 'Veterinary', 'Pet Taxi'].map((status) => (
                          <DropdownMenuItem key={status} onClick={() => setSortStatus(status)}>
                            {status}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType('Type 2')}>
                    Type 2
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType('Type 3')}>
                    Type 3
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
            </div>
          </div>
          <div className="overflow-x-auto rounded-xl">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600">
                  <th className="px-4 py-5 border-b">Case ID</th>
                  <th className="px-4 py-5 border-b">Pet Name</th>
                  <th className="px-4 py-5 border-b">Start Date</th>
                  <th className="px-4 py-5 border-b">End Date</th>
                  <th className="px-4 py-5 border-b">Assign Employee</th>
                  <th className="px-4 py-5 border-b">Current Status</th>
                  <th className="px-4 py-5 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.map((caseItem, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-6 border-b">{caseItem.caseId}</td>
                    <td className="px-4 py-6 border-b">{caseItem.petName}</td>
                    <td className="px-4 py-6 border-b">{caseItem.startDate}</td>
                    <td className="px-4 py-6 border-b">{caseItem.endDate}</td>
                    <td className="px-4 py-6 border-b">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md border border-yellow-300">
                        {caseItem.assignEmployee}
                      </span>
                    </td>
                    <td className="px-4 py-6 border-b">
                      <span className={`px-2 py-1 rounded-md border ${
                        caseItem.currentStatus === 'Dog Walking'
                          ? 'bg-pink-100 text-pink-800 border-pink-300'
                          : caseItem.currentStatus === 'Salon'
                          ? 'bg-green-100 text-green-800 border-green-300'
                          : caseItem.currentStatus === 'Veterinary'
                          ? 'bg-orange-100 text-orange-800 border-orange-300'
                          : 'bg-blue-100 text-blue-800 border-blue-300'
                      }`}>
                        {caseItem.currentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-6 border-b">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="text-gray-600 hover:text-gray-800">
                          <MoreHorizontal className="h-5 w-5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => alert('View case')}>
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => alert('Update case')}>
                            Update
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ScrollArea>
    </MainLayout>
  );
}
