import { z, Genkit } from "genkit";

// Assuming this correctly imports your Mongoose model
import menu from "../model/menuData";

// The function to fetch data is fine
const getAllMenuData = async () => {
  try {
    const menuItems = await menu.find();
    // console.log(menuItems); // Consider if you want this log firing every time the tool runs
    return menuItems;
  } catch (err) {
    console.error("Error fetching menu data:", err);
    // Depending on your error handling strategy, you might want to re-throw or return an empty array/error object
    throw err;
  }
};

// Define the Zod schema for a single menu item
export const menuItemSchema = z.object({
  // Note: Mongoose automatically handles the _id ObjectId
  // If you want to include the auto-generated _id, add:
  // _id: z.string(), // Mongoose ObjectId can often be treated as string
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
});

export const menuTool = (ai: Genkit) =>
  ai.defineTool(
    {
      name: "todaysMenu",
      description: "use this tool to retrieve all items on today's menu",
      inputSchema: z.object({}),
      outputSchema: z.object({
        menuData: z
          .array(menuItemSchema)
          .describe("A list of all items on the menu"),
      }),
    },
    async () => {
      const menuDataArray = await getAllMenuData();
      return { menuData: menuDataArray };
    }
  );
