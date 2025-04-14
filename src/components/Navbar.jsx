import { PlaneTakeoff, LogOut } from 'lucide-react';

const Navbar = ({ onLogout }) => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-600 p-2">
              <PlaneTakeoff className="w-5 h-5 text-white" />
            </div>
            <span className="ml-2 text-xl font-bold text-gray-800">Global AirCargo</span>
          </div>
          
          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <span className="mr-1">Logout</span>
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;