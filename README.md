# Requirements

- nextjs app router, tailwindcss
- viem and wagmi v2, web3 modal
- create `useWeb3()` hook
- a tokens list with chain and address
- useTokenData hook (use multicall for rpc optimization)
- main page with given layout
- deposit form using depositETH function

## Run the app locally

1. Clone the repo

1. Create a `.env` file in the root directory and add the following line:
```
NEXT_PUBLIC_PROJECT_ID="<your key from waller connect cloud>"
``` 

1. Install dependencies
```
pnpm i
```

1. Run the app
```
pnpm dev
```
