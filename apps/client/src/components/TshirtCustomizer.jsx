
// // // import React, { useState, useEffect } from 'react';

// // // const TshirtCustomizer = () => {
// // //   const [logoFile, setLogoFile] = useState(null);
// // //   const [presetDesigns, setPresetDesigns] = useState([]);
// // //   const [customElements, setCustomElements] = useState([]);
// // //   const [tshirtColor, setTshirtColor] = useState('#ffffff');

// // //   useEffect(() => {
// // //     const fetchPresetDesigns = async () => {
// // //       try {
// // //         const response = await fetch('/api/preset-designs');
// // //         const designs = await response.json();
// // //         setPresetDesigns(designs);
// // //       } catch (error) {
// // //         console.error('Error fetching preset designs:', error);
// // //       }
// // //     };
// // //     fetchPresetDesigns();
// // //   }, []);

// // //   const handleLogoUpload = (file) => {
// // //     setLogoFile(file);
// // //   };

// // //   const handleElementAdd = (element) => {
// // //     setCustomElements([...customElements, element]);
// // //   };

// // //   const handleElementUpdate = (index, updatedElement) => {
// // //     const updatedElements = [...customElements];
// // //     updatedElements[index] = updatedElement;
// // //     setCustomElements(updatedElements);
// // //   };

// // //   const handleElementRemove = (index) => {
// // //     const updatedElements = [...customElements];
// // //     updatedElements.splice(index, 1);
// // //     setCustomElements(updatedElements);
// // //   };

// // //   const handleTshirtColorChange = (color) => {
// // //     setTshirtColor(color);
// // //   };

// // //   const handleMockupGenerate = async () => {
// // //     try {
// // //       const response = await fetch('/api/generate-mockup', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json'
// // //         },
// // //         body: JSON.stringify({
// // //           elements: customElements,
// // //           tshirtColor
// // //         })
// // //       });
// // //       const { mockupUrl } = await response.json();
// // //       // Download or display the mockup
// // //     } catch (error) {
// // //       console.error('Error generating mockup:', error);
// // //     }
// // //   };

// // //   const handleDesignSave = async () => {
// // //     try {
// // //       const response = await fetch('/api/save-design', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json'
// // //         },
// // //         body: JSON.stringify({
// // //           userId: 'user123',
// // //           designName: 'My Design',
// // //           elements: customElements,
// // //           tshirtColor
// // //         })
// // //       });
// // //       const { designId } = await response.json();
// // //       // Handle saved design, e.g., display a success message
// // //     } catch (error) {
// // //       console.error('Error saving design:', error);
// // //     }
// // //   };

// // //   return (
// // //     <div style={{ maxWidth: '800px', margin: '0 auto', padding: '16px' }}>
// // //       <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
// // //         T-Shirt Customizer
// // //       </h1>
// // //       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
// // //         <div>
// // //           <div style={{ marginBottom: '16px' }}>
// // //             <label style={{ display: 'block', fontWeight: 'medium', marginBottom: '8px' }}>
// // //               Upload Logo
// // //             </label>
// // //             <input
// // //               type="file"
// // //               style={{ border: '1px solid #ccc', padding: '8px', width: '100%' }}
// // //               onChange={(e) => handleLogoUpload(e.target.files[0])}
// // //             />
// // //           </div>
// // //           <div style={{ marginBottom: '16px' }}>
// // //             <label style={{ display: 'block', fontWeight: 'medium', marginBottom: '8px' }}>
// // //               Add Text
// // //             </label>
// // //             <input
// // //               type="text"
// // //               style={{ border: '1px solid #ccc', padding: '8px', width: '100%' }}
// // //               placeholder="Enter text"
// // //               onChange={(e) =>
// // //                 handleElementAdd({
// // //                   type: 'text',
// // //                   content: e.target.value,
// // //                   position: { x: 100, y: 200 },
// // //                   rotation: 0,
// // //                   scale: 1,
// // //                   fontSize: 24,
// // //                   fontFamily: 'Arial',
// // //                   color: '#000000'
// // //                 })
// // //               }
// // //             />
// // //           </div>
// // //           <div style={{ marginBottom: '16px' }}>
// // //             <label style={{ display: 'block', fontWeight: 'medium', marginBottom: '8px' }}>
// // //               T-Shirt Color
// // //             </label>
// // //             <input
// // //               type="color"
// // //               style={{ width: '100%' }}
// // //               value={tshirtColor}
// // //               onChange={(e) => handleTshirtColorChange(e.target.value)}
// // //             />
// // //           </div>
// // //         </div>
// // //         <div>
// // //           <div style={{ marginBottom: '16px' }}>
// // //             <label style={{ display: 'block', fontWeight: 'medium', marginBottom: '8px' }}>
// // //               Preview
// // //             </label>
// // //             <div
// // //               style={{
// // //                 width: '300px',
// // //                 height: '400px',
// // //                 border: '1px solid #ccc',
// // //                 borderRadius: '4px',
// // //                 backgroundColor: tshirtColor,
// // //                 position: 'relative'
// // //               }}
// // //             >
// // //               {customElements.map((element, index) => (
// // //                 <div
// // //                   key={index}
// // //                   style={{
// // //                     position: 'absolute',
// // //                     left: element.position.x,
// // //                     top: element.position.y,
// // //                     transform: `rotate(${element.rotation}deg) scale(${element.scale})`,
// // //                     fontSize: `${element.fontSize}px`,
// // //                     fontFamily: element.fontFamily,
// // //                     color: element.color
// // //                   }}
// // //                 >
// // //                   {element.content}
// // //                 </div>
// // //               ))}
// // //               {logoFile && (
// // //                 <img
// // //                   src="/api/placeholder/100/100"
// // //                   alt="Logo"
// // //                   style={{
// // //                     position: 'absolute',
// // //                     width: '100px',
// // //                     height: '100px'
// // //                   }}
// // //                 />
// // //               )}
// // //             </div>
// // //           </div>
// // //           <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
// // //             <button
// // //               style={{
// // //                 backgroundColor: '#4CAF50',
// // //                 color: 'white',
// // //                 padding: '8px 16px',
// // //                 border: 'none',
// // //                 borderRadius: '4px',
// // //                 cursor: 'pointer',
// // //                 marginRight: '8px'
// // //               }}
// // //               onClick={handleMockupGenerate}
// // //             >
// // //               Generate Mockup
// // //             </button>
// // //             <button
// // //               style={{
// // //                 backgroundColor: '#2196F3',
// // //                 color: 'white',
// // //                 padding: '8px 16px',
// // //                 border: 'none',
// // //                 borderRadius: '4px',
// // //                 cursor: 'pointer'
// // //               }}
// // //               onClick={handleDesignSave}
// // //             >
// // //               Save Design
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default TshirtCustomizer;

// import React, { useState, useEffect } from 'react';

// const TshirtCustomizer = () => {
//   const [logoFile, setLogoFile] = useState(null);
//   const [presetDesigns, setPresetDesigns] = useState([]);
//   const [customElements, setCustomElements] = useState([]);
//   const [tshirtColor, setTshirtColor] = useState('#ffffff');

//   useEffect(() => {
//     const fetchPresetDesigns = async () => {
//       try {
//         const response = await fetch('/api/preset-designs');
//         const designs = await response.json();
//         setPresetDesigns(designs);
//       } catch (error) {
//         console.error('Error fetching preset designs:', error);
//       }
//     };
//     fetchPresetDesigns();
//   }, []);

//   const handleLogoUpload = (file) => {
//     setLogoFile(file);
//   };

//   const handleElementAdd = (element) => {
//     setCustomElements([...customElements, element]);
//   };

//   const handleElementUpdate = (index, updatedElement) => {
//     const updatedElements = [...customElements];
//     updatedElements[index] = updatedElement;
//     setCustomElements(updatedElements);
//   };

//   const handleElementRemove = (index) => {
//     const updatedElements = [...customElements];
//     updatedElements.splice(index, 1);
//     setCustomElements(updatedElements);
//   };

//   const handleTshirtColorChange = (color) => {
//     setTshirtColor(color);
//   };

//   const handleMockupGenerate = async () => {
//     try {
//       const response = await fetch('/api/generate-mockup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           elements: customElements,
//           tshirtColor,
//         }),
//       });
//       const { mockupUrl } = await response.json();
//       // Download or display the mockup
//     } catch (error) {
//       console.error('Error generating mockup:', error);
//     }
//   };

//   const handleDesignSave = async () => {
//     try {
//       const response = await fetch('/api/save-design', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           userId: 'user123',
//           designName: 'My Design',
//           elements: customElements,
//           tshirtColor,
//         }),
//       });
//       const { designId } = await response.json();
//       // Handle saved design, e.g., display a success message
//     } catch (error) {
//       console.error('Error saving design:', error);
//     }
//   };

//   return (
//     <>
//       <style>
//         {`
//           * {
//             margin: 0;
//             padding: 0;
//             box-sizing: border-box;
//           }
//           html, body {
//             height: 100%;
//           }
//           body {
//             margin: 0;
//             padding: 0;
//             background: linear-gradient(to bottom right, #0f0c29, #302b63, #24243e);
//           }
//         `}
//       </style>
//       <div
//         style={{
//           minHeight: '100vh',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <div
//           style={{
//             maxWidth: '800px',
//             width: '100%',
//             padding: '24px',
//             backgroundColor: '#f0f0f0',
//             borderRadius: '8px',
//             boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//           }}
//         >
//           <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
//             T-Shirt Customizer
//           </h1>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
//             <div>
//               <div style={{ marginBottom: '16px' }}>
//                 <label style={{ display: 'block', fontWeight: 'medium', marginBottom: '8px' }}>
//                   Upload Logo
//                 </label>
//                 <input
//                   type="file"
//                   style={{
//                     border: '1px solid #ccc',
//                     padding: '8px',
//                     width: '100%',
//                     borderRadius: '4px',
//                   }}
//                   onChange={(e) => handleLogoUpload(e.target.files[0])}
//                 />
//               </div>
//               <div style={{ marginBottom: '16px' }}>
//                 <label style={{ display: 'block', fontWeight: 'medium', marginBottom: '8px' }}>
//                   Add Text
//                 </label>
//                 <input
//                   type="text"
//                   style={{
//                     border: '1px solid #ccc',
//                     padding: '8px',
//                     width: '100%',
//                     borderRadius: '4px',
//                   }}
//                   placeholder="Enter text"
//                   onChange={(e) =>
//                     handleElementAdd({
//                       type: 'text',
//                       content: e.target.value,
//                       position: { x: 100, y: 200 },
//                       rotation: 0,
//                       scale: 1,
//                       fontSize: 24,
//                       fontFamily: 'Arial',
//                       color: '#000000',
//                     })
//                   }
//                 />
//               </div>
//               <div style={{ marginBottom: '16px' }}>
//                 <label style={{ display: 'block', fontWeight: 'medium', marginBottom: '8px' }}>
//                   T-Shirt Color
//                 </label>
//                 <input
//                   type="color"
//                   style={{ width: '100%', borderRadius: '4px' }}
//                   value={tshirtColor}
//                   onChange={(e) => handleTshirtColorChange(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div>
//               <div style={{ marginBottom: '16px' }}>
//                 <label style={{ display: 'block', fontWeight: 'medium', marginBottom: '8px' }}>
//                   Preview
//                 </label>
//                 <div
//                   style={{
//                     width: '300px',
//                     height: '400px',
//                     border: '1px solid #ccc',
//                     borderRadius: '4px',
//                     backgroundColor: tshirtColor,
//                     position: 'relative',
//                   }}
//                 >
//                   {customElements.map((element, index) => (
//                     <div
//                       key={index}
//                       style={{
//                         position: 'absolute',
//                         left: element.position.x,
//                         top: element.position.y,
//                         transform: `rotate(${element.rotation}deg) scale(${element.scale})`,
//                         fontSize: `${element.fontSize}px`,
//                         fontFamily: element.fontFamily,
//                         color: element.color,
//                       }}
//                     >
//                       {element.content}
//                     </div>
//                   ))}
//                   {logoFile && (
//                     <img
//                       src="/api/placeholder/100/100"
//                       alt="Logo"
//                       style={{
//                         position: 'absolute',
//                         width: '100px',
//                         height: '100px',
//                       }}
//                     />
//                   )}
//                 </div>
//               </div>
//               <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
//                 <button
//                   style={{
//                     backgroundColor: '#4CAF50',
//                     color: 'white',
//                     padding: '8px 16px',
//                     border: 'none',
//                     borderRadius: '4px',
//                     cursor: 'pointer',
//                     marginRight: '8px',
//                   }}
//                   onClick={handleMockupGenerate}
//                 >
//                   Generate Mockup
//                 </button>
//                 <button
//                   style={{
//                     backgroundColor: '#2196F3',
//                     color: 'white',
//                     padding: '8px 16px',
//                     border: 'none',
//                     borderRadius: '4px',
//                     cursor: 'pointer',
//                   }}
//                   onClick={handleDesignSave}
//                 >
//                   Save Design
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TshirtCustomizer;
