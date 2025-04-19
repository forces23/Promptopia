import client from '@lib/db';

async function test() {
  try {
    await client.connect();
    const db = client.db("promptopia_db");
    console.log("Collections:", await db.listCollections().toArray());
  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    await client.close();
  }
}

test();
