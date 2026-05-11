const supabase = require("./db");


async function main() {
    const test = await supabase
        .from("wallets")
        .insert([
            {
                wallet: "test",
                private_key: "test"
            }
        ]).select();

    console.log(test);
}


main();
