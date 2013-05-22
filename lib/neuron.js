/* jshint node: true */

"use strict";

/*
    Neuron
*/

module.exports = function () {

    return {

        /*
            Stores the all prior states this Neuron has ever had.

            History currently goes on forever and must maintain a globally synced index.
        */

        history: [],

        /*
            An array of Neurons which are "action potential" outputs from this Neuron.
        */

        synapses: [],

        /*
            Connect a synapse for triggering after a call to setState.

            var synapse = {
                setState: function (value) {},
                getState: function (index) {}
            };
        */

        connectSynapse: function (synapse) {

            if (synapse) {
                this.synapses.push(synapse);
                return true;
            }

            return false;
        },

        /*
            Set the state of the Neuron to either 0 or 1

            Something out side of this Neuron normalizes inputs from multiple Neurons to 0-1.
        */

        setState: function (value) {

            this.history.push(value ? 1 : 0);
            this.triggerAction();
        },

        /*
            Return the current state or the state from a prior index.
        */

        getState: function (index) {

            if (index === undefined) {
                index = this.history.length - 1;
            }

            return this.history[index] || 0;
        },

        /*
            Return the index of the last time this Neuron was set to 0 (the ideal).
        */

        getLastIdealIndex: function (index) {

            if (index === undefined) {
                index = this.history.length - 1;
            }

            while (index >= 0) {
                if (this.history[index] === 0) {
                    return index;
                }
                index = index - 1;
            }

            return 0;
        },

        /*
            "action potential"
        */

        triggerAction: function (index) {

            var synapseIndex,
                synapse,
                state,
                difference = 0;

            /*
                If we are not ideal then set the state of all connected synapses the values used last time we were ideal.
            */

            if (this.getState() === 1 && this.synapses.length) {

                /*
                    Look at the history to see when this Neuron was last ideal.
                */

                if (index === undefined) {
                    index = this.getLastIdealIndex();
                }

                /*
                    Catch any bad recursion.
                */

                if (index < 0) {
                    return;
                }

                /*
                    For the given index check if this Neuron was ideal.
                    If not then go back in time and ask again.
                */

                if (this.getState(index) !== 0) {
                    this.triggerAction(index - 1);
                    return;
                }

                /*
                    Ask all synapses if they had the same state at the given index.
                */

                for (synapseIndex in this.synapses) {
                    synapse = this.synapses[synapseIndex];
                    if (synapse.getState(index) !== synapse.getState()) {
                        difference = difference + 1;
                    }
                }

                /*
                    If there was no difference then go back in time and ask again.
                */

                if (difference === 0) {
                    this.triggerAction(index - 1);
                    return;
                }

                /*
                    If we have got to this point then the Neuron and all Synapses were ideal at the index.
                    Go through all connected synapses and set their state to the value found at index.
                */

                for (synapseIndex in this.synapses) {
                    synapse = this.synapses[synapseIndex];
                    state = synapse.getState(index);
                    synapse.setState(state);
                }
            }
        }
    };
};
