import * as libp2p from 'libp2p';
import * as TCP from 'libp2p-tcp';
import { NOISE } from 'libp2p-noise';

class Networking {

    node: libp2p;

    constructor() {
        this.createNode();
    }

    async createNode() {
        this.node = await libp2p.create({
            modules: {
              transport: [TCP],
              connEncryption: [NOISE],
              streamMuxer: []
            }
        })
    }
}
