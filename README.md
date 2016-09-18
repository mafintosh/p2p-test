# p2p-test

Test and report p2p connectivity on the current network

```
npm install -g p2p-test
p2p-test [optional-short-message-description-of-the-network]
```

It works by sending a couple of UDP packets to some known endpoints (p2p-test-1.mafintosh.com and p2p-test-2.mafintosh.com)
and having the endpoints analyse them.

You can take a look at the server here, https://github.com/mafintosh/p2p-test-server

## Results

The result of this survey will be published in my talk at [NodeConf Argentina](https://2016.nodeconf.com.ar) and in a following blog post about p2p hole punching.

## License

MIT
