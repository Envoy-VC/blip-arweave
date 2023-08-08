# ▶️ Blip

Blip is a video sharing app that leverages the power of Arweave. With Blip, users can securely upload their videos to the blockchain, ensuring permanent storage. Additionally, Blip allows users to easily manage the rights to their content by utilizing the Universal Data License. It's a simple and efficient way to share and protect your videos on the Arweave network.

---

## Features ✨

Blip offers several key features that make it a standout video sharing app:

1. **Permanent Storage**: Blip utilizes Arweave, providing users with a secure and permanent storage solution for their videos. With a one-time upfront fee, videos are stored on the blockchain, ensuring long-term accessibility.
2. **Universal Data Licensing**: Users can easily manage the rights to their videos by adding license tags through Blip's universal data licensing feature. This allows for clear specifications on content rights, including derivation, revenue share, and commercial use.
3. **Smartweave Contracts**: Blip leverages smartweave contracts for all interaction logic, such as commenting, liking, and disliking. This ensures a seamless and efficient user experience.
4. **Wallet Connection**: Blip integrates ArweaveKit for wallet connection, enabling users to connect multiple Arweave wallets, including ArConnect, Arweave.app, and Othnet. Additionally, users can log in with their Google accounts for added convenience.
5. **ArProfile Customization**: Similar to ENS Profiles, Blip offers ArProfile, allowing users to personalize their avatars, handles, and names on the Arweave network. This adds a touch of individuality to their video sharing experience.
6. **Live Video Transcoding**: Blip incorporates Livepeer for live video transcoding, minimizing latency and ensuring a smooth streaming experience between you and your video content.

---

## Screenshots 📸

<table>
  <tr>
    <td valign="top" width="50%">
      <br>
      <img src="https://i.ibb.co/Df7Sg76/1.png" >
    </td>
    <td valign="top" width="50%">
      <br>
      <img src="https://i.ibb.co/W5RmYQh/2.png" alt="Attachments" >
    </td>
  </tr>
</table>

<table>
  <tr>
    <td valign="top" width="50%">
      <img src="https://i.ibb.co/RBsknHc/3.png" alt="Create Attachment" >
    </td>
    <td valign="top" width="50%">
      <img src="https://i.ibb.co/8Pyx8Nv/4.png" alt="Start Conversation" >
    </td>
  </tr>
</table>

<table>
  <tr>
    <td valign="top" width="50%">
      <img src="https://i.ibb.co/mGn5V5d/5.png" alt="Create Attachment" >
    </td>
    <td valign="top" width="50%">
      <img src="https://i.ibb.co/tJ6Z7hS/6.png" alt="Start Conversation" >
    </td>
  </tr>
</table>

---

## Video Demo 🎥

---

## Tech Stack 💻

- [Arweave](https://www.arweave.org/) + [Bundlr Network](https://bundlr.network/) - Data Storage
- [ArweaveKit](https://www.arweavekit.com/) + [thirdweb](https://thirdweb.com/) - Wallet Connection
- [Warp](https://warp.cc/) - Smart Contracts on Arweave
- [Livepeer](https://livepeer.org/) - Video Transcoding
- [antd](https://ant.design/) - UI Design
- [Next.js](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/) - Front-end

---

## Getting Started 🚀

### 📝 Smart Contract

To get started with Blip smart contracts, follow these steps:

1. Navigate to the contracts directory and locate the contracts under the `src` folder.
2. Install the necessary dependencies by running the following command:
   ```bash
   npm install
   ```
3. Build the contracts by running the build command:
   ```bash
   npm run build
   ```
4. To run the tests located in the tests folder, use the following command:

   ```bash
   npm run test
   ```

   This will execute the `blip.test.ts` file and run the tests.

5. If you wish to deploy your contract to the mainnet, there is a deploy script available in the `tools` folder. Before running the script, make sure to store your _JWK Key_ in a folder named "`keys`" with the file name "`jwk.json`".
6. To deploy the contract, run the following command:
   ```bash
   npx ts-node tools/deploy-contract.ts
   ```

Additionally, there is already a deployed contract on the mainnet with the contract address:

```
a-mJI2Mb3puHbi1Md5TYNFMNVyvKDPwx1yHBafpE7mc
```

You can view the Contract in the [explorer](https://sonar.warp.cc/#/app/contract/a-mJI2Mb3puHbi1Md5TYNFMNVyvKDPwx1yHBafpE7mc?network=mainnet)

https://sonar.warp.cc/#/app/contract/a-mJI2Mb3puHbi1Md5TYNFMNVyvKDPwx1yHBafpE7mc?network=mainnet

---

### 📱 Blip App

To get started with the Blip frontend app, follow these steps:
Navigate to the app directory and install the necessary dependencies by running the following command:

```bash
npm install
```

Create a new file called `.env.local` in the root directory of the `app`. This file will contain the required environment variables.
Inside the `.env.local` file, add the following environment variables:

```bash
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=''
NEXT_PUBLIC_LIVEPEER_API_KEY=''
```

To obtain the thirdweb Client Id, you can visit the [thirdweb Dashboard](https://thirdweb.com/dashboard) and retrieve the API key from there.

Similarly, for the Livepeer API, you can obtain it from the [Livepeer Studio dashboard](https://livepeer.studio/dashboard).

Once you have filled in the environment variables in the `.env.local` file, you can start the development server by running the following command:

```bash
npm run dev
```

Open your web browser and navigate to http://localhost:3000 to access the Blip app.

By following these steps, you will be able to set up and run the Blip contracts and front-end app on your local development environment.

Enjoy exploring the features and functionalities of Blip!

---
