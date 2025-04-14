import { Calendar, MapPin, Phone, User, Package } from 'lucide-react';
import TrackingStatus from './TrackingStatus';
import { allTrackingDetails } from '../data/trackingData';
import Navbar from './Navbar';
import Footer from './Footer';

const TrackingPage = ({ trackingNumber, onLogout }) => {
  const trackingData = allTrackingDetails[trackingNumber];
  const { status } = trackingData;
  
  // Generate appropriate message based on status
  const getStatusMessage = () => {
    if (status.arrived) {
      return `Package "${trackingData.items}" with tracking number "${trackingData.confirmationNumber}" has arrived at ${trackingData.arrival.location} on ${trackingData.lastUpdate}.`;
    } else if (status.inTransit) {
      return `Package "${trackingData.items}" with tracking number "${trackingData.confirmationNumber}" is in transit from ${trackingData.departure.location} to ${trackingData.arrival.location}. Expected arrival in 24 hours.`;
    } else if (status.departed) {
      return `Package "${trackingData.items}" with tracking number "${trackingData.confirmationNumber}" has departed from ${trackingData.departure.location}. Will arrive in 24 hours.`;
    }
    return `Package "${trackingData.items}" with tracking number "${trackingData.confirmationNumber}" is scheduled for departure.`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar onLogout={onLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header with tracking number */}
          <div className="bg-blue-600 text-white p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold">Tracking Details</h1>
                <p className="text-blue-100">Confirmation Number: {trackingData.confirmationNumber}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">Flight No: {trackingData.flightNumber}</p>
                <p className="text-sm text-blue-100">{trackingData.operator}</p>
              </div>
            </div>
          </div>
          
          {/* Status Message */}
          <div className="border-b border-gray-200 bg-blue-50 p-4">
            <p className="text-blue-800 font-medium">{getStatusMessage()}</p>
          </div>
          
          {/* Tracking Status */}
          <TrackingStatus status={status} />
          
          {/* Shipment Details */}
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Shipment Details</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div>
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 border-b">
                    <h3 className="font-medium text-gray-700">Route Information</h3>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start mb-4">
                      <MapPin className="mt-1 h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium text-gray-700">Origin</p>
                        <p className="text-gray-600">{trackingData.departure.location}</p>
                        <p className="text-gray-600">{trackingData.departure.code} ({trackingData.departure.country})</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="mt-1 h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium text-gray-700">Destination</p>
                        <p className="text-gray-600">{trackingData.arrival.location}</p>
                        <p className="text-gray-600">{trackingData.arrival.code} ({trackingData.arrival.country})</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden mt-4">
                  <div className="bg-gray-50 px-4 py-2 border-b">
                    <h3 className="font-medium text-gray-700">Schedule</h3>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start mb-4">
                      <Calendar className="mt-1 h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium text-gray-700">Departure</p>
                        <p className="text-gray-600">{trackingData.departure.date} | {trackingData.departure.time}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Calendar className="mt-1 h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium text-gray-700">Arrival</p>
                        <p className="text-gray-600">{trackingData.arrival.date} | {trackingData.arrival.time}</p>
                      </div>
                    </div>
                    
                    {trackingData.layover && (
                      <div className="mt-3 text-sm text-gray-500">
                        {trackingData.layover}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Right Column */}
              <div>
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 border-b">
                    <h3 className="font-medium text-gray-700">Contact Information</h3>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start mb-4">
                      <User className="mt-1 h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium text-gray-700">Sender</p>
                        <p className="text-gray-600">{trackingData.sender.name}</p>
                        <div className="flex items-center mt-1">
                          <Phone className="h-4 w-4 text-gray-400 mr-1" />
                          <p className="text-gray-600 text-sm">{trackingData.sender.phone}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <User className="mt-1 h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium text-gray-700">Receiver</p>
                        <p className="text-gray-600">{trackingData.receiver.name}</p>
                        <div className="flex items-center mt-1">
                          <Phone className="h-4 w-4 text-gray-400 mr-1" />
                          <p className="text-gray-600 text-sm">{trackingData.receiver.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden mt-4">
                  <div className="bg-gray-50 px-4 py-2 border-b">
                    <h3 className="font-medium text-gray-700">Package Details</h3>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start">
                      <Package className="mt-1 h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium text-gray-700">Items</p>
                        <p className="text-gray-600">{trackingData.items}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Status:</span>
                        <span className={`font-medium ${status.arrived ? 'text-green-600' : 'text-blue-600'}`}>
                          {status.arrived ? 'Delivered' : status.inTransit ? 'In Transit' : 'Departed'}
                        </span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="font-medium text-gray-700">Estimated Delivery:</span>
                        <span className="text-gray-600">{trackingData.estimatedDelivery}</span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="font-medium text-gray-700">Last Update:</span>
                        <span className="text-gray-600">{trackingData.lastUpdate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrackingPage;