class HandParser {
    static parse(hands) {
        return hands.map((hand) => new Hand(hand))
    }
}

class Hand {
    constructor(handData) {
        if (!handData) throw "No Data Supplied";
        this.handData = handData;



        this.calculateFingerDistances(handData);
    }

    calculateFingerDistances() {
        const isUPs = this.handData.keypoints.filter((v) => (v.name).indexOf('tip') != -1).map((i) => {
            if (i.name.indexOf('thumb') < 0) {

                return this.setFingerUp(i.name.split('_')[0],
                    this.computeDistance(i, this.handData.keypoints.find((v) => (v.name).indexOf(i.name.split('_tip')[0] + "_mcp") != -1)
                    )
                )
            }
            else {

                return this.setFingerUp(i.name.split('_')[0],
                    this.computeDistance(i, this.handData.keypoints.find((v) => (v.name).indexOf('middle_finger_mcp') != -1)
                    )
                )
            }
        });
        this.numFingersUp = isUPs.reduce((a, b) => a + b);
    }


    computeDistance(fingerBottom, fingertip) {
        const dx = fingerBottom.x - fingertip.x;
        const dy = fingerBottom.y - fingertip.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    setFingerUp(name, distanceFromBottom) {

        const isUp = distanceFromBottom > 45;

        switch (name) {
            case 'pinky':
                this.pinkyUp = isUp;
                break;

            case 'thumb':
                this.thumbUp = distanceFromBottom > 55;
                break;
            case 'middle':
                this.middleUp = isUp;
                break;
            case 'ring':
                this.ringUp = isUp;
                break;
            case 'index':
                this.indexUp = isUp;
                break;

            default:
                break;
        }
        return isUp;
    }



}