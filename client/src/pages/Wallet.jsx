// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Wallet = () => {
//   const [walletData, setWalletData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchWalletData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/display");
//         if (response.data.success) {
//           setWalletData(response.data.wallet); // Set the wallet data in state
//         } else {
//           setError("Failed to fetch wallet data.");
//         }
//       } catch (error) {
//         setError("Error fetching wallet data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWalletData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;
//   if (!walletData) return <div className="w-full h-full flex items-center">No wallet data available</div>;

//   // Calculate totals for blocked credits (if applicable)
//   const totalBlockedCgst = walletData.blockedcgst.reduce((acc, val) => acc + val, 0);
//   const totalBlockedSgst = walletData.blockedsgst.reduce((acc, val) => acc + val, 0);
//   const totalBlockedIgst = walletData.blockedigst.reduce((acc, val) => acc + val, 0);

//   const totalGST = walletData.cgst.reduce((acc, val) => acc + val, 0) + walletData.sgst.reduce((acc, val) => acc + val, 0) + walletData.igst.reduce((acc, val) => acc + val, 0);
//   console.log(walletData)
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center text-white">Real-Time GST Liability Wallet</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
//         <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg rounded-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Current GST Credits</h2>
//           <p className="text-4xl font-bold">CGST: ₹{walletData.cgst.reduce((acc, val) => acc + val, 0)}</p>
//           <p className="text-4xl font-bold">SGST: ₹{walletData.sgst.reduce((acc, val) => acc + val, 0)}</p>
//           <p className="text-4xl font-bold">IGST: ₹{walletData.igst.reduce((acc, val) => acc + val, 0)}</p>
//           <div className="relative pt-4">
//             <div className="overflow-hidden h-4 text-xs flex rounded bg-indigo-300">
//               <div className="bg-indigo-900 h-full" style={{ width: '60%' }}></div>
//             </div>
//           </div>
//           <p className="text-sm text-indigo-100 mt-2">60% of credit limit</p>
//         </div>

//         <div className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg rounded-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Blocked Credits</h2>
//           <p className="text-4xl font-bold">CGST: ₹{totalBlockedCgst}</p>
//           <p className="text-4xl font-bold">SGST: ₹{totalBlockedSgst}</p>
//           <p className="text-4xl font-bold">IGST: ₹{totalBlockedIgst}</p>
          
//           <div className="relative pt-4">
//             <div className="overflow-hidden h-4 text-xs flex rounded bg-green-300">
//               <div className="bg-green-900 h-full" style={{ width: '20%' }}></div>
//             </div>
//           </div>
//           <p className="text-sm text-green-100 mt-2">20% of total credits</p>
//         </div>
//       </div>

//       <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
//         <h2 className="text-xl font-semibold mb-4 text-indigo-700">Recent Transactions</h2>
//         <ul className="space-y-4">
//           <li className="flex justify-between items-center border-b pb-2">
//             <span className='text-amber-700'>Invoice #1234</span>
//             <span className="text-green-600 font-bold">+₹5,000</span>
//           </li>
//           <li className="flex justify-between items-center border-b pb-2">
//             <span className='text-amber-700'>Tax Payment</span>
//             <span className="text-red-600 font-bold">-₹10,000</span>
//           </li>
//           <li className="flex justify-between items-center border-b pb-2">
//             <span className='text-amber-700'>Credit Note #789</span>
//             <span className="text-green-600 font-bold">+₹2,000</span>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Wallet;






// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Wallet = () => {
//   const [walletData, setWalletData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [openingBalance, setOpeningBalance] = useState(""); // Manage opening balance input
//   const [totalGST, setTotalGST] = useState(0); // Calculated total GST

//   useEffect(() => {
//     const fetchWalletData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/display");
//         if (response.data.success) {
//           setWalletData(response.data.wallet);
//         } else {
//           setError("Failed to fetch wallet data.");
//         }
//       } catch (error) {
//         setError("Error fetching wallet data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWalletData();
//   }, []);

//   useEffect(() => {
//     if (walletData) {
//       const currentGST =
//         walletData.cgst.reduce((acc, val) => acc + val, 0) +
//         walletData.sgst.reduce((acc, val) => acc + val, 0) +
//         walletData.igst.reduce((acc, val) => acc + val, 0);

//       const blockedGST =
//         walletData.blockedcgst.reduce((acc, val) => acc + val, 0) +
//         walletData.blockedsgst.reduce((acc, val) => acc + val, 0) +
//         walletData.blockedigst.reduce((acc, val) => acc + val, 0);

//       const balance = openingBalance === "" ? 0 : Number(openingBalance); // Handle blank opening balance
//       setTotalGST(balance + currentGST - blockedGST);
//     }
//   }, [walletData, openingBalance]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;
//   if (!walletData) return <div className="w-full h-full flex items-center">No wallet data available</div>;

//   const totalBlockedCgst = walletData.blockedcgst.reduce((acc, val) => acc + val, 0);
//   const totalBlockedSgst = walletData.blockedsgst.reduce((acc, val) => acc + val, 0);
//   const totalBlockedIgst = walletData.blockedigst.reduce((acc, val) => acc + val, 0);

//   const totalCurrentCgst = walletData.cgst.reduce((acc, val) => acc + val, 0);
//   const totalCurrentSgst = walletData.sgst.reduce((acc, val) => acc + val, 0);
//   const totalCurrentIgst = walletData.igst.reduce((acc, val) => acc + val, 0);

//   const totalCurrentGST = totalCurrentCgst + totalCurrentSgst + totalCurrentIgst;
//   const totalBlockedGST = totalBlockedCgst + totalBlockedSgst + totalBlockedIgst;

//   const getPercentage = (part, total) => (total === 0 ? 0 : ((part / total) * 100).toFixed(2));

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center text-gray-200">GST Liability Wallet</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Current GST Credits */}
//         <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white shadow-lg rounded-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Current GST Credits</h2>
//           <p className="text-lg font-bold">CGST: ₹{totalCurrentCgst}</p>
//           <p className="text-lg font-bold">SGST: ₹{totalCurrentSgst}</p>
//           <p className="text-lg font-bold">IGST: ₹{totalCurrentIgst}</p>
//           <div className="relative pt-4">
//             <div className="h-6 bg-gray-400 rounded flex">
//               <div
//                 className="h-6 bg-blue-600 rounded-l"
//                 style={{ width: `${getPercentage(totalCurrentCgst, totalCurrentGST)}%` }}
//               >
//                 <span className="text-xs text-white ml-2">{getPercentage(totalCurrentCgst, totalCurrentGST)}% CGST</span>
//               </div>
//               <div
//                 className="h-6 bg-green-600"
//                 style={{ width: `${getPercentage(totalCurrentSgst, totalCurrentGST)}%` }}
//               >
//                 <span className="text-xs text-white ml-2">{getPercentage(totalCurrentSgst, totalCurrentGST)}% SGST</span>
//               </div>
//               <div
//                 className="h-6 bg-purple-600 rounded-r"
//                 style={{ width: `${getPercentage(totalCurrentIgst, totalCurrentGST)}%` }}
//               >
//                 <span className="text-xs text-white ml-2">{getPercentage(totalCurrentIgst, totalCurrentGST)}% IGST</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Blocked GST Credits */}
//         <div className="bg-gradient-to-r from-red-700 via-red-800 to-red-900 text-white shadow-lg rounded-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Blocked GST Credits</h2>
//           <p className="text-lg font-bold">CGST: ₹{totalBlockedCgst}</p>
//           <p className="text-lg font-bold">SGST: ₹{totalBlockedSgst}</p>
//           <p className="text-lg font-bold">IGST: ₹{totalBlockedIgst}</p>
//           <div className="relative pt-4">
//             <div className="h-6 bg-red-400 rounded flex">
//               <div
//                 className="h-6 bg-red-600 rounded-l"
//                 style={{ width: `${getPercentage(totalBlockedCgst, totalBlockedGST)}%` }}
//               >
//                 <span className="text-xs text-white ml-2">{getPercentage(totalBlockedCgst, totalBlockedGST)}% CGST</span>
//               </div>
//               <div
//                 className="h-6 bg-red-700"
//                 style={{ width: `${getPercentage(totalBlockedSgst, totalBlockedGST)}%` }}
//               >
//                 <span className="text-xs text-white ml-2">{getPercentage(totalBlockedSgst, totalBlockedGST)}% SGST</span>
//               </div>
//               <div
//                 className="h-6 bg-red-800 rounded-r"
//                 style={{ width: `${getPercentage(totalBlockedIgst, totalBlockedGST)}%` }}
//               >
//                 <span className="text-xs text-white ml-2">{getPercentage(totalBlockedIgst, totalBlockedGST)}% IGST</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Opening Balance Input and Total GST */}
//       <div className="bg-gray-900 text-white shadow-lg rounded-lg p-6 mt-8">
//         <h2 className="text-xl font-semibold mb-4 text-gray-300">Total GST Calculation</h2>
//         <input
//           type="number"
//           className="w-full bg-gray-800 text-gray-200 rounded-md p-2 mb-4"
//           value={openingBalance}
//           onChange={(e) => setOpeningBalance(e.target.value.replace(/^0+/, ""))}
//           placeholder="Enter opening balance"
//         />
//         <p className="text-2xl font-bold text-gray-200">
//           Total GST: ₹{totalGST}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Wallet;



import React, { useState, useEffect } from "react";
import axios from "axios";

const Wallet = () => {
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openingBalance, setOpeningBalance] = useState(""); // Manage opening balance input
  const [totalGST, setTotalGST] = useState(0); // Calculated total GST

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/display");
        if (response.data.success) {
          setWalletData(response.data.wallet);
        } else {
          setError("Failed to fetch wallet data.");
        }
      } catch (error) {
        setError("Error fetching wallet data.");
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, []);

  useEffect(() => {
    if (walletData) {
      const currentGST =
        walletData.cgst.reduce((acc, val) => acc + val, 0) +
        walletData.sgst.reduce((acc, val) => acc + val, 0) +
        walletData.igst.reduce((acc, val) => acc + val, 0);

      const blockedGST =
        walletData.blockedcgst.reduce((acc, val) => acc + val, 0) +
        walletData.blockedsgst.reduce((acc, val) => acc + val, 0) +
        walletData.blockedigst.reduce((acc, val) => acc + val, 0);

      const balance = openingBalance === "" ? 0 : Number(openingBalance); // Handle blank opening balance
      setTotalGST(balance + currentGST - blockedGST);
    }
  }, [walletData, openingBalance]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!walletData) return <div className="w-full h-full flex items-center">No wallet data available</div>;

  const totalBlockedCgst = walletData.blockedcgst.reduce((acc, val) => acc + val, 0);
  const totalBlockedSgst = walletData.blockedsgst.reduce((acc, val) => acc + val, 0);
  const totalBlockedIgst = walletData.blockedigst.reduce((acc, val) => acc + val, 0);

  const totalCurrentCgst = walletData.cgst.reduce((acc, val) => acc + val, 0);
  const totalCurrentSgst = walletData.sgst.reduce((acc, val) => acc + val, 0);
  const totalCurrentIgst = walletData.igst.reduce((acc, val) => acc + val, 0);

  const totalCurrentGST = totalCurrentCgst + totalCurrentSgst + totalCurrentIgst;
  const totalBlockedGST = totalBlockedCgst + totalBlockedSgst + totalBlockedIgst;

  const getPercentage = (part, total) => (total === 0 ? 0 : ((part / total) * 100).toFixed(2));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-200">GST Liability Wallet</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Current GST Credits */}
        <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Current GST Credits</h2>
          <p className="text-lg font-bold">CGST: ₹{totalCurrentCgst.toFixed(2)}</p>
          <p className="text-lg font-bold">SGST: ₹{totalCurrentSgst.toFixed(2) }</p>
          <p className="text-lg font-bold">IGST: ₹{totalCurrentIgst.toFixed(2) }</p>
          <div className="relative pt-4">
            <div className="h-6 bg-gray-400 rounded flex">
              <div
                className="h-6 bg-blue-600 rounded-l flex items-center justify-center"
                style={{ width: `${getPercentage(totalCurrentCgst, totalCurrentGST)}%` }}
              >
                <span className="text-xs text-white">{getPercentage(totalCurrentCgst, totalCurrentGST)}%</span>
              </div>
              <div
                className="h-6 bg-green-600 flex items-center justify-center"
                style={{ width: `${getPercentage(totalCurrentSgst, totalCurrentGST)}%` }}
              >
                <span className="text-xs text-white">{getPercentage(totalCurrentSgst, totalCurrentGST)}%</span>
              </div>
              <div
                className="h-6 bg-purple-600 rounded-r flex items-center justify-center"
                style={{ width: `${getPercentage(totalCurrentIgst, totalCurrentGST)}%` }}
              >
                <span className="text-xs text-white">{getPercentage(totalCurrentIgst, totalCurrentGST)}%</span>
              </div>
            </div>
            <div className="flex justify-between text-gray-300 text-sm mt-1">
              <span>CGST</span>
              <span>SGST</span>
              <span>IGST</span>
            </div>
          </div>
        </div>

        {/* Blocked GST Credits */}
        <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Blocked GST Credits</h2>
          <p className="text-lg font-bold">CGST: ₹{totalBlockedCgst}</p>
          <p className="text-lg font-bold">SGST: ₹{totalBlockedSgst}</p>
          <p className="text-lg font-bold">IGST: ₹{totalBlockedIgst}</p>
          <div className="relative pt-4">
            <div className="h-6 bg-gray-400 rounded flex">
              <div
                className="h-6 bg-blue-600 rounded-l flex items-center justify-center"
                style={{ width: `${getPercentage(totalBlockedCgst, totalBlockedGST)}%` }}
              >
                <span className="text-xs text-white">{getPercentage(totalBlockedCgst, totalBlockedGST)}%</span>
              </div>
              <div
                className="h-6 bg-green-600 flex items-center justify-center"
                style={{ width: `${getPercentage(totalBlockedSgst, totalBlockedGST)}%` }}
              >
                <span className="text-xs text-white">{getPercentage(totalBlockedSgst, totalBlockedGST)}%</span>
              </div>
              <div
                className="h-6 bg-purple-600 rounded-r flex items-center justify-center"
                style={{ width: `${getPercentage(totalBlockedIgst, totalBlockedGST)}%` }}
              >
                <span className="text-xs text-white">{getPercentage(totalBlockedIgst, totalBlockedGST)}%</span>
              </div>
            </div>
            <div className="flex justify-between text-gray-300 text-sm mt-1">
              <span>CGST</span>
              <span>SGST</span>
              <span>IGST</span>
            </div>
          </div>
        </div>
      </div>

      {/* Opening Balance Input and Total GST */}
      <div className="bg-gray-900 text-white shadow-lg rounded-lg p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-300">Total GST Calculation</h2>
        <label className="block text-gray-400 mb-2">Enter Opening Balance:</label>
        <input
          type="number"
          className="w-full bg-gray-800 text-gray-200 rounded-md p-2 mb-4"
          value={openingBalance}
          onChange={(e) => setOpeningBalance(e.target.value.replace(/^0+/, ""))}
          placeholder="Enter opening balance"
        />
        <p className="text-2xl font-bold text-gray-200">
          Total GST: ₹{totalGST}
        </p>
      </div>
    </div>
  );
};

export default Wallet;
