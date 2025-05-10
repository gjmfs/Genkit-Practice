import { z, Genkit } from "genkit";
import orders from "../model/oder";
const handleOrder = async (req) => {
  try {
    const { name, address, foodName, quantity, total } = req;
    const userOrder = await orders.create({
      name: name,
      address: address,
      foodName: foodName,
      quantity: quantity,
      total: total,
    });
    console.log(userOrder);
    return "order placed";
  } catch (err) {
    return err;
  }
};
export const orderItemSchema = z
  .object({
    name: z.string().describe("Name of the customer"),
    address: z.string().describe("Delivery address for the order"),
    foodName: z.string().describe("Name of the food item being ordered"),
    quantity: z.number().int().positive().describe("Quantity of the food item"),
    total: z.number().positive().describe("Total price of the order"),
  })
  .describe("Data required to place a food order");

export const orderTool = (ai: Genkit) =>
  ai.defineTool(
    {
      name: "OrderFood",
      description:
        "use this tools to make an food order for the user. total price of the order calculate using quantity and food price. make sure if user ask to order. place an order",
      inputSchema: orderItemSchema,
      outputSchema: z
        .object({
          orderData: z.string(),
        })
        .describe("The order Status of the user"),
    },
    async (input: z.infer<typeof orderItemSchema>) => {
      const orderData = await handleOrder(input);
      return { orderData: orderData };
    }
  );
