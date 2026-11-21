

export async function POST( request: Request) {
    try {
        const body = await request.json();
        
        const { question } = body;
        
        if (!question || typeof question !== "string") {
            return new Response("Question is required and must be a string", { status: 400 });
        }

        console.log(`Received question: ${question}`);

        return Response.json(
            { role: "assistant", reply: `You asked: ${question}` },
        );

    } catch (error) {
        console.log(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}