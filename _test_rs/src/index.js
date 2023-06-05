// @ts-check

import fs from "fs";
//
//
/**
 *
 * @param {string[]} files
 */
// const search = (files) => {
//   const tree = {};
//   let counter = 0;
//   for (const file of files) {
//     const parts = file.split("\\\\");

//     let ref = tree;
//     // console.log(file, parts)
//     for (const part of parts) {
//       if (ref[part] === undefined) {
//         ref[part] = {};
//       }
//       ref = ref[part];
//     }
//     // 913490
//     // if (counter === 4) {
//     //   break;
//     // }
//     counter += 1;
//   }

//   // map = new Map([...map].sort());

//   /** @type {string[]} */
//   // const items = [];
//   // map.forEach((value, key) => {
//   //   items.push(`"${key}","${value}"`);
//   // });

//   fs.writeFileSync("./data/items_map.log", JSON.stringify(tree, null, 2), {
//     encoding: "utf-8",
//   });
// };

/**
 *
 * @param {string[]} files
 */
const search = (files) => {
	for (const file of files) {
		if (file.includes("IMG-20220531-WA0018.jpg")) {
			console.log("found");
		}
	}
};
//
//
//
//
const startTime = performance.now();
//
//
//
const fileReadStart = performance.now();
const fileContent = fs.readFileSync("./data/files.log", {
	encoding: "utf-8",
});
const fileReadEnd = performance.now();
//
//
//
const fileSplitStart = performance.now();
const files = fileContent.split("\\n");
const fileSplitEnd = performance.now();
//
//
// search algo
const searchStart = performance.now();
search(files);
const searchEnd = performance.now();
// time print
//
//
const endTime = performance.now();
console.table([
	{
		fileRead: `${(fileReadEnd - fileReadStart).toFixed(3)}ms`,
		fileSplit: `${(fileSplitEnd - fileSplitStart).toFixed(3)}ms`,
		searchEnd: `${(searchEnd - searchStart).toFixed(3)}ms`,
		total: `${(endTime - startTime).toFixed(3)}ms`,
	},
]);

/*
// linear search in sorted
took: 19.065ms
took: 23.076ms
took: 20.844ms
took: 19.982ms
took: 20.840ms
*/
