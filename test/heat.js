/* global describe, it */
/* jshint node: true */

"use strict";

var assert = require("assert"),
    neuron = require("../lib/neuron");

describe("Neuron object learning to avoid heat", function () {

    it("should NOT change the state of input from 0", function () {

        var input = neuron(),
            output = neuron(),
            index = 0;

        // Connect the input and output Neurons.
        input.connectSynapse(output);

        // Make some time go by.
        while (index < 10) {

            if (index === 2) {
                input.setState(1); // pain
            } else if (index === 3) {
                // input.setState(0); // no pain (this is the lesson)
            } else if (index === 5) {
                input.setState(1); // pain
            } else if (index === 7) {
                input.setState(1); // pain
            } else {
                input.setState(input.getState());
            }

            if (index === 3) {
                output.setState(1); // stopped pain
            } else if (index === 5) {
                // output.setState(0); // stopped pain
            } else if (index === 7) {
                // output.setState(1); // stopped pain
            } else {
                output.setState(output.getState());
            }

            // console.log(index + ": Temperature " + input.getState() + " and Position " + output.getState());

            index = index + 1;
        }

        assert.equal(output.getState(), 0);
        assert.equal(input.getState(), 1);
    });

    it("should change the state of output to 0 to make input state read 0", function () {

        var input = neuron(),
            output = neuron(),
            index = 0,
            ouputLastState;

        // Connect the input and output Neurons.
        input.connectSynapse(output);

        // Make some time go by.
        while (index < 10) {

            // React to the output state change if input is in pain (not ideal).
            if (input.getState() === 1 && output.getState() !== ouputLastState) {
                // As the output state changed to react to the pain stop the pain.
                input.setState(0);
            }

            // Store the state of output.
            ouputLastState = output.getState();

            if (index === 2) {
                input.setState(1); // pain
            } else if (index === 3) {
                input.setState(0); // no pain (this is the lesson)
            } else if (index === 5) {
                input.setState(1); // pain
            } else if (index === 7) {
                input.setState(1); // pain
            } else {
                input.setState(input.getState());
            }

            if (index === 3) {
                output.setState(1); // stopped pain
            } else if (index === 5) {
                // output.setState(0); // stopped pain
            } else if (index === 7) {
                // output.setState(1); // stopped pain
            } else {
                output.setState(output.getState());
            }

            // console.log(index + ": Temperature " + input.getState() + " and Position " + output.getState());

            index = index + 1;
        }

        assert.equal(output.getState(), 1);
        assert.equal(input.getState(), 0);
    });
});