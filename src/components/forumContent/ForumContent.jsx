// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const ForumContent = () => {
//   const navigate = useNavigate();
//   const [hasAccessToken, setHasAccessToken] = useState(false);
//   const handleNavigate = (path) => {
//     const access_token = localStorage.getItem("access_token");
//     if (!access_token) {
//       navigate("/login");
//     } else {
//       navigate(path);   
//     }
//   };
//   return (
//     <div>
//     <main className="w-[96%] mx-auto p-4 flex flex-col lg:flex-row justify-between lg:space-x-8">
//       <div className="lg:w-2/3 space-y-4 transition-transform duration-500 ">
//         {/* Banner */}
//         <div className="relative w-full bg-blue-600 rounded-lg overflow-hidden">
//           <img
//             src="../src/assets/forum_content.gif"
//             alt="Cartoon"
//             className="object-cover w-full h-full"
//           />
//           <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center">
//             <div className="text-center animate-fadeInUp">
//               <h1 className="text-3xl font-bold text-white font-suwannaphum transition-transform duration-300 hover:scale-105">
//                 សំណួរ និង ដំណោះស្រាយ
//               </h1>
//               <span className="text-white mt-2 text-[20px] font-suwannaphum transition-transform duration-300 hover:scale-105">
//                 ចួលរួមជាមួយពួកយើង​
//                 អ្នកអាចធ្វើការបង្កើតសំណួរនិងធ្វើការឆ្លើយសំណួរដែលទាក់ទងនិងស្ទែម
//               </span> <br />
//               <button 
//                 onClick={() => handleNavigate("/create_forum")}
//                 className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-lg font-suwannaphum transition-transform duration-300 hover:scale-105"
//               >
//                 បង្កើតសំណួរឥឡូវនេះ
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Sidebar */}
//       <aside className="w-full lg:w-1/3 space-y-4 mt-8 lg:mt-0 shadow-sm border">
//         ` <div className="bg-white shadow rounded-lg p-4 transition-transform duration-300 transform hover:scale-105">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4 font-suwannaphum">
//               សំណួរដែលពេញនិយម
//             </h2>
//             <ul className="space-y-2">
//               <li className="text-gray-900 hover:underline font-suwannaphum">
//                 តើ STEM ជាអ្វី?
//               </li>
//               <li className="text-gray-900 hover:underline font-suwannaphum">
//                 ហេតុអ្វីត្រូវរៀន STEM?
//               </li>
//               <li className="text-gray-900 hover:underline font-suwannaphum">
//                 តើតំបន់ណាដែលសាកសមសម្រាប់ការសិក្សា STEM?
//               </li>
//               <li className="text-gray-900 hover:underline font-suwannaphum">
//                 តើគោលបំណងនៃការសិក្សា STEM គឺអ្វី?
//               </li>
//               <li className="text-gray-900 hover:underline font-suwannaphum">
//                 តើត្រូវធ្វើដូចម្តេចដើម្បីឈានដល់ការសិក្សា STEM?
//               </li>
//             </ul>
//           </div>
//           <div className="bg-white shadow rounded-lg p-4 transition-transform duration-300 transform hover:scale-105">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4 font-suwannaphum">
//               សំណួរដែលទាក់ទង
//             </h2>
//             <ul className="space-y-2">
//               <li className="text-gray-900 hover:underline font-suwannaphum">
//                 តើតំបន់ណាដែលមានការសិក្សា STEM ច្រើន?
//               </li>
//               <li className="text-gray-900 hover:underline font-suwannaphum">
//                 តើគ្រួសារបានឱ្យការគាំទ្រ STEM ដូចម្តេច?
//               </li>
//               <li className="text-gray-900 hover:underline font-suwannaphum">
//                 តើអ្វីជាចំនុចពិសេសនៃការសិក្សា STEM?
//               </li>
//               <li className="text-gray-900 hover:underline font-suwannaphum">
//                 តើការសិក្សា STEM អាចផ្តល់អត្ថប្រយោជន៍អ្វី?
//               </li>
//             </ul>
//           </div>
//           <div className="bg-white shadow rounded-lg p-4 transition-transform duration-300 transform hover:scale-105">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4 font-suwannaphum">
//               សំណួរដែលពេញនិយម
//             </h2>
//             <ul className="space-y-2">
//               <li className="text-gray-900 hover:underline font-suwannaphum">
//                 តើការសិក្សា STEM មានសារៈសំខាន់ដូចម្តេច?
//               </li>
//               <li className="text-gray-900 hover:underline font-suwannaphum">
//                 តើអ្វីជាចំណុចពិសេសនៃវិស័យ STEM?
//               </li>
//               <li className="text-gray-900 hover:underline font-suwannaphum">
//                 តើមានអ្វីទៀតដែលត្រូវបានគេរាប់បញ្ចូលក្នុង STEM?
//               </li>
//               <li className="text-gray-900 hover:underline font-suwannaphum">
//                 តើការសិក្សា STEM អាចបង្កើនជំនាញអ្វីខ្លះ?
//               </li>
//             </ul>
//           </div>
//         </aside>

//     </main>
//    </div>
//   );

// };

// export default ForumContent;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForumContent = () => {
  const navigate = useNavigate();
  const [hasAccessToken, setHasAccessToken] = useState(false);
  const handleNavigate = (path) => {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      navigate("/login");
    } else {
      navigate(path);   
    }
  };

  return (
    <div>
      <main className="w-[96%] mx-auto p-4 flex flex-col lg:flex-row justify-between lg:space-x-8">
        {/* Main Content */}
        <div className="w-full lg:w-2/3 space-y-4 transition-transform duration-500">
          {/* Banner */}
          <div className="relative w-full bg-blue-600 rounded-lg overflow-hidden">
            <img
              src="../src/assets/forum_content.gif"
              alt="Cartoon"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center">
              <div className="text-center animate-fadeInUp">
                <h1 className="text-3xl font-bold text-white font-suwannaphum transition-transform duration-300 hover:scale-105">
                  សំណួរ និង ដំណោះស្រាយ
                </h1>
                <span className="text-white mt-2 text-[20px] font-suwannaphum transition-transform duration-300 hover:scale-105">
                  ចូលរួមជាមួយពួកយើង​
                  អ្នកអាចធ្វើការបង្កើតសំណួរនិងធ្វើការឆ្លើយសំណួរដែលទាក់ទងនឹង STEM
                </span> <br />
                <button 
                  onClick={() => handleNavigate("/create_forum")}
                  className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-lg font-suwannaphum transition-transform duration-300 hover:scale-105"
                >
                  បង្កើតសំណួរឥឡូវនេះ
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:w-1/3 space-y-4 mt-8 lg:mt-0 shadow-sm border">
          <div className="bg-white rounded-lg p-4 transition-transform duration-300 transform hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 font-suwannaphum">
              សំណួរដែលពេញនិយម
            </h2>
            <ul className="space-y-2">
              <li className="text-gray-900 hover:underline font-suwannaphum">
                តើ STEM ជាអ្វី?
              </li>
              <li className="text-gray-900 hover:underline font-suwannaphum">
                ហេតុអ្វីត្រូវរៀន STEM?
              </li>
              <li className="text-gray-900 hover:underline font-suwannaphum">
                តើតំបន់ណាដែលសាកសមសម្រាប់ការសិក្សា STEM?
              </li>
              <li className="text-gray-900 hover:underline font-suwannaphum">
                តើគោលបំណងនៃការសិក្សា STEM គឺអ្វី?
              </li>
              <li className="text-gray-900 hover:underline font-suwannaphum">
                តើត្រូវធ្វើដូចម្តេចដើម្បីឈានដល់ការសិក្សា STEM?
              </li>
            </ul>
          </div>
          <div className="bg-white shadow rounded-lg p-4 transition-transform duration-300 transform hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 font-suwannaphum">
              សំណួរដែលទាក់ទង
            </h2>
            <ul className="space-y-2">
              <li className="text-gray-900 hover:underline font-suwannaphum">
                តើតំបន់ណាដែលមានការសិក្សា STEM ច្រើន?
              </li>
              <li className="text-gray-900 hover:underline font-suwannaphum">
                តើគ្រួសារបានឱ្យការគាំទ្រ STEM ដូចម្តេច?
              </li>
              <li className="text-gray-900 hover:underline font-suwannaphum">
                តើអ្វីជាចំនុចពិសេសនៃការសិក្សា STEM?
              </li>
              <li className="text-gray-900 hover:underline font-suwannaphum">
                តើការសិក្សា STEM អាចផ្តល់អត្ថប្រយោជន៍អ្វី?
              </li>
            </ul>
          </div>
          <div className="bg-white shadow rounded-lg p-4 transition-transform duration-300 transform hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 font-suwannaphum">
              សំណួរដែលពេញនិយម
            </h2>
            <ul className="space-y-2">
              <li className="text-gray-900 hover:underline font-suwannaphum">
                តើការសិក្សា STEM មានសារៈសំខាន់ដូចម្តេច?
              </li>
              <li className="text-gray-900 hover:underline font-suwannaphum">
                តើអ្វីជាចំណុចពិសេសនៃវិស័យ STEM?
              </li>
              <li className="text-gray-900 hover:underline font-suwannaphum">
                តើមានអ្វីទៀតដែលត្រូវបានគេរាប់បញ្ចូលក្នុង STEM?
              </li>
              <li className="text-gray-900 hover:underline font-suwannaphum">
                តើការសិក្សា STEM អាចបង្កើនជំនាញអ្វីខ្លះ?
              </li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default ForumContent;


