// // function checkTimeAndSetLampje() {
// //     const now = new Date();
// //     const targetHour = 12; 

// //     if (now.getHours() >= targetHour) {
// //         GetData().then(data => {
// //             console.log("JSON data:", data);

// //             if (!data.lights.LED2) {
// //                  SetLampje(2, true); 
// //                 console.log("Lampje 2 is AAN gezet om 3 uur of later.");
// //             } else {
// //                 console.log("Lampje 2 stond al aan.");
// //             }
// //         });
// //     }
// // }

// // setInterval(checkTimeAndSetLampje, 1000);

// function checkLDRAndSetLampje() {
//     const threshold = 300; 

//     GetData().then(data => {
//         if (data && data.ldr !== null) {
//             const ldrValue = data.ldr; 
//             console.log(`Huidige LDR-waarde: ${ldrValue}`);

//             if (ldrValue <= threshold) {
//                 if (!data.lights.LED2) {
//                     SetLampje(2, true); // Zet lampje 2 aan
//                     console.log("Lampje 2 is AAN gezet omdat de LDR-waarde onder de drempel zit.");
//                 } else {
//                     console.log("Lampje 2 stond al aan.");
//                 }
//             } else {
//                 console.log("LDR-waarde is boven de drempel. Lampje 2 blijft uit.");
//             }
//         } else {
//             console.error("Kon geen LDR-gegevens ophalen.");
//         }
//     }).catch(error => {
//         console.error("Fout bij het ophalen van gegevens:", error);
//     });
// }

// setInterval(checkLDRAndSetLampje, 1000);