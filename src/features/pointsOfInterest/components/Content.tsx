// import { Html } from "@react-three/drei";
// import React from "react";
// import { useWebflowContent } from "~/shared/utils/hooks/useWebflowContent";

// export default function Content() {
//   const { content: contentData, error, isLoading } = useWebflowContent();

//   if (error) {
//     return (
//       <Html>
//         <div>{error}</div>
//       </Html>
//     );
//   }

//   if (isLoading || !contentData) {
//     return (
//       <Html>
//         <div>Loading...</div>
//       </Html>
//     );
//   }

//   return (
//     <>
//       <Html>
//         <div className="flex flex-col items-center justify-center">
//           <h1 className="text-4xl font-bold text-red-500">
//             {contentData.fieldData.title}
//           </h1>
//           <img
//             src={contentData.fieldData["featured-image"].url}
//             alt={contentData.fieldData["featured-image"].alt || "Featured"}
//           />
//         </div>
//       </Html>
//     </>
//   );
// }
