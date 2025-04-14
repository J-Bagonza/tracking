import { Calendar, MapPin, Phone, User, Package } from 'lucide-react';
import TrackingStatus from './TrackingStatus';
import Navbar from './Navbar';
import Footer from './Footer';
import { allTrackingDetails } from '../data/trackingData';

const TrackingPage = ({ trackingNumber, onLogout }) => {
  const trackingData = allTrackingDetails[trackingNumber];
  const { status } = trackingData;

  const getStatusMessage = () => {
    const { items, confirmationNumber, departure, arrival, lastUpdate } = trackingData;

    if (status.arrived) {
      return `Package "${items}" with tracking number "${confirmationNumber}" has arrived at ${arrival.location} on ${lastUpdate}.`;
    }
    if (status.inTransit) {
      return `Package "${items}" with tracking number "${confirmationNumber}" is in transit from ${departure.location} to ${arrival.location}. Expected arrival in 24 hours.`;
    }
    if (status.departed) {
      return `Package "${items}" with tracking number "${confirmationNumber}" has departed from ${departure.location}. Will arrive in 24 hours.`;
    }
    return `Package "${items}" with tracking number "${confirmationNumber}" is scheduled for departure.`;
  };

  const InfoRow = ({ icon: Icon, label, lines = [] }) => (
    <div className="flex items-start mb-4">
      <Icon className="mt-1 h-5 w-5 text-gray-400 mr-3" />
      <div>
        <p className="font-medium text-gray-700">{label}</p>
        {lines.map((line, idx) => (
          <p key={idx} className="text-gray-600">{line}</p>
        ))}
      </div>
    </div>
  );

  const ContactCard = ({ title, person }) => (
    <div className="mb-4">
      <InfoRow
        icon={User}
        label={title}
        lines={[person.name]}
      />
      <div className="flex items-center ml-8">
        <Phone className="h-4 w-4 text-gray-400 mr-1" />
        <p className="text-gray-600 text-sm">{person.phone}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar onLogout={onLogout} />

      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          
          {/* Header */}
          <div
  className="bg-blue-600 text-black p-6 flex justify-between items-center"
  style={{
    backgroundImage: `url('/plane.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
>
  <div>
    <h1 className="text-xl font-bold">Tracking Details</h1>
    <p className="text-black">Confirmation Number: {trackingData.confirmationNumber}</p>
  </div>
  <div className="text-right">
    <p className="font-semibold">Flight No: {trackingData.flightNumber}</p>
    <p className="text-sm text-black">{trackingData.operator}</p>
  </div>
</div>

          {/* Status Message */}
          <div className="border-b border-gray-200 bg-blue-50 p-4">
            <p className="text-blue-800 font-medium">{getStatusMessage()}</p>
          </div>

          {/* Status Tracker */}
          <TrackingStatus status={status} />

          {/* Details Section */}
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Shipment Details</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div>

                {/* Route Info */}
                <div className="border rounded-lg overflow-hidden mb-4">
                  <div className="bg-gray-50 px-4 py-2 border-b">
                    <h3 className="font-medium text-gray-700">Route Information</h3>
                  </div>
                  <div className="p-4">
                    <InfoRow
                      icon={MapPin}
                      label="Origin"
                      lines={[
                        trackingData.departure.location,
                        `${trackingData.departure.code} (${trackingData.departure.country})`
                      ]}
                    />
                    <InfoRow
                      icon={MapPin}
                      label="Destination"
                      lines={[
                        trackingData.arrival.location,
                        `${trackingData.arrival.code} (${trackingData.arrival.country})`
                      ]}
                    />
                  </div>
                </div>

                {/* Schedule */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 border-b">
                    <h3 className="font-medium text-gray-700">Schedule</h3>
                  </div>
                  <div className="p-4">
                    <InfoRow
                      icon={Calendar}
                      label="Departure"
                      lines={[`${trackingData.departure.date} | ${trackingData.departure.time}`]}
                    />
                    <InfoRow
                      icon={Calendar}
                      label="Arrival"
                      lines={[`${trackingData.arrival.date} | ${trackingData.arrival.time}`]}
                    />
                    {trackingData.layover && (
                      <div className="mt-3 text-sm text-gray-500">{trackingData.layover}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                {/* Contact Info */}
                <div className="border rounded-lg overflow-hidden mb-4">
                  <div className="bg-gray-50 px-4 py-2 border-b">
                    <h3 className="font-medium text-gray-700">Contact Information</h3>
                  </div>
                  <div className="p-4">
                    <ContactCard title="Sender" person={trackingData.sender} />
                    <ContactCard title="Receiver" person={trackingData.receiver} />
                  </div>
                </div>

                {/* Package Info */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 border-b">
                    <h3 className="font-medium text-gray-700">Package Details</h3>
                  </div>
                  <div className="p-4">
                    <InfoRow
                      icon={Package}
                      label="Items"
                      lines={[trackingData.items]}
                    />
                    <div className="mt-4 pt-4 border-t space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Status:</span>
                        <span className={`font-medium ${status.arrived ? 'text-green-600' : 'text-blue-600'}`}>
                          {status.arrived ? 'Delivered' : status.inTransit ? 'In Transit' : 'Departed'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Estimated Delivery:</span>
                        <span className="text-gray-600">{trackingData.estimatedDelivery}</span>
                      </div>
                      <div className="flex justify-between">
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
