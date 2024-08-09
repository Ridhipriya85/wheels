'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown, Eye, Trash, Edit3, MoreHorizontal, ToggleLeft } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const employeeData = [
  { serialNo: '001', firstName: 'John', lastName: 'Doe', gender: 'Male', roleType: 'Dog Walking', address: '123 Main St, City, Country', mobileNo: '+91 9898098980', emailId: 'john.doe@example.com', status: 'Available' },
  { serialNo: '002', firstName: 'Jane', lastName: 'Smith', gender: 'Female', roleType: 'Salon Visit', address: '456 Elm St, City, Country', mobileNo: '+91 9898098981', emailId: 'jane.smith@example.com', status: 'Unavailable' },
  { serialNo: '003', firstName: 'Alice', lastName: 'Johnson', gender: 'Female', roleType: 'Veterinary Visit', address: '789 Pine St, City, Country', mobileNo: '+91 9898098982', emailId: 'alice.johnson@example.com', status: 'Available' },
  { serialNo: '004', firstName: 'Bob', lastName: 'Brown', gender: 'Male', roleType: 'Pet Taxi', address: '101 Maple St, City, Country', mobileNo: '+91 9898098983', emailId: 'bob.brown@example.com', status: 'Unavailable' },
  { serialNo: '005', firstName: 'Charlie', lastName: 'Davis', gender: 'Male', roleType: 'Pet Handling', address: '202 Oak St, City, Country', mobileNo: '+91 9898098984', emailId: 'charlie.davis@example.com', status: 'Available' },
  { serialNo: '006', firstName: 'Eve', lastName: 'White', gender: 'Female', roleType: 'Pet Rescue', address: '303 Birch St, City, Country', mobileNo: '+91 9898098985', emailId: 'eve.white@example.com', status: 'Unavailable' },
];

export default function EmployeeManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('By type');
  const [employees, setEmployees] = useState(employeeData);
  const router = useRouter();

  const handleAddAdminClick = () => {
    router.push('/employee-form');
  };

  const handleToggleStatus = (index: number) => {
    const newEmployees = [...employees];
    newEmployees[index].status = newEmployees[index].status === 'Available' ? 'Unavailable' : 'Available';
    setEmployees(newEmployees);
  };

  const handleView = (index: number) => {
    // Implement view logic here
    console.log(`Viewing employee: ${employees[index].firstName} ${employees[index].lastName}`);
  };

  const handleEdit = (index: number) => {
    // Implement edit logic here
    console.log(`Editing employee: ${employees[index].firstName} ${employees[index].lastName}`);
  };

  const handleDelete = (index: number) => {
    const newEmployees = [...employees];
    newEmployees.splice(index, 1);
    setEmployees(newEmployees);
  };

  return (
    <MainLayout meta={{ title: 'Employee Management' }}>
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <div className="flex">
            <button
              className="ml-auto bg-yellow-500 text-white px-4 py-2 rounded-lg justify-end"
              onClick={handleAddAdminClick}
            >
              + Add New
            </button>
          </div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Employee</h2>
            <div className="flex space-x-2 w-full max-w-3xl">
              <input
                type="text"
                placeholder="Search by name or phone number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-2 flex-1"
              />
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-600 border border-gray-300 rounded-xl px-4 py-2">
                  {filterType} <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {['Type 1', 'Type 2', 'Type 3'].map((type) => (
                    <DropdownMenuItem key={type} onClick={() => setFilterType(type)}>
                      {type}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="overflow-x-auto rounded-xl">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600">
                  <th className="px-4 py-5 border-b">Serial No</th>
                  <th className="px-4 py-5 border-b">Employee Name</th>
                  <th className="px-4 py-5 border-b">Gender</th>
                  <th className="px-4 py-5 border-b">Role Type</th>
                  <th className="px-4 py-5 border-b">Address</th>
                  <th className="px-4 py-5 border-b">Contact</th>
                  <th className="px-4 py-5 border-b">Status</th>
                  <th className="px-4 py-5 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {employees
                  .filter((employee) =>
                    `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    employee.mobileNo.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((employee, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-6 border-b">{employee.serialNo}</td>
                      <td className="px-4 py-6 border-b">{employee.firstName} {employee.lastName}</td>
                      <td className="px-4 py-6 border-b">{employee.gender}</td>
                      <td className="px-4 py-6 border-b">{employee.roleType}</td>
                      <td className="px-4 py-6 border-b">{employee.address}</td>
                      <td className="px-4 py-6 border-b">
                        <div className="flex flex-col">
                          <span>{employee.mobileNo}</span>
                          <span className="text-gray-500 text-sm">{employee.emailId}</span>
                        </div>
                      </td>
                      <td className="px-4 py-6 border-b">
                        <span className={`px-2 py-1 rounded-lg ${employee.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {employee.status}
                        </span>
                      </td>
                      <td className="px-4 py-6 border-b">
                        <div className="flex justify-center space-x-1">
                          <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center text-gray-600 p-1">
                              <MoreHorizontal className="h-4 w-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => handleView(index)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEdit(index)}>
                                <Edit3 className="h-4 w-4 mr-2" />
                                Update
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDelete(index)}>
                                <Trash className="h-4 w-4 mr-2 text-red-500" />
                                Delete
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleToggleStatus(index)}>
                                <ToggleLeft className="h-4 w-4 mr-2" />
                                Status
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
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
