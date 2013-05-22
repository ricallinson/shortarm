/* global describe, it */
/* jshint node: true */

"use strict";

var assert = require("assert"),
    neuron = require("../lib/neuron");

describe("neuron object", function () {

    it("should be a function", function () {
        assert.equal(typeof neuron, "function");
    });

    it("should return an object", function () {
        assert.equal(typeof neuron(), "object");
    });

    it("should have a function setState", function () {
        var neuronObj = neuron();
        assert.equal(typeof neuronObj.setState, "function");
    });

    it("should have a function getState", function () {
        var neuronObj = neuron();
        assert.equal(typeof neuronObj.getState, "function");
    });

    it("should have a function getLastIdealIndex", function () {
        var neuronObj = neuron();
        assert.equal(typeof neuronObj.getLastIdealIndex, "function");
    });

    it("should have a function connectSynapse", function () {
        var neuronObj = neuron();
        assert.equal(typeof neuronObj.connectSynapse, "function");
    });

    it("should have a function triggerAction", function () {
        var neuronObj = neuron();
        assert.equal(typeof neuronObj.triggerAction, "function");
    });
});

describe("neuron objects state functions", function () {

    it("should set a state as a binary and return 1", function () {
        var neuronObj = neuron();
        neuronObj.setState(1);
        assert.equal(neuronObj.getState(), 1);
    });

    it("should set a state as a binary and return 0", function () {
        var neuronObj = neuron();
        neuronObj.setState(0);
        assert.equal(neuronObj.getState(), 0);
    });

    it("should set a state as a boolean and return 1", function () {
        var neuronObj = neuron();
        neuronObj.setState(true);
        assert.equal(neuronObj.getState(), 1);
    });

    it("should set a state as a boolean and return 0", function () {
        var neuronObj = neuron();
        neuronObj.setState(false);
        assert.equal(neuronObj.getState(), 0);
    });

    it("should set a state as a int and return 1", function () {
        var neuronObj = neuron();
        neuronObj.setState(11);
        assert.equal(neuronObj.getState(), 1);
    });

    it("should set a state as a negative int and return 1", function () {
        var neuronObj = neuron();
        neuronObj.setState(-11);
        assert.equal(neuronObj.getState(), 1);
    });

    it("should set a state as a int and return 0", function () {
        var neuronObj = neuron();
        neuronObj.setState(0);
        assert.equal(neuronObj.getState(), 0);
    });

    it("should set a state as a null and return 0", function () {
        var neuronObj = neuron();
        neuronObj.setState(null);
        assert.equal(neuronObj.getState(), 0);
    });

    it("should set a state as a undefined and return 0", function () {
        var neuronObj = neuron();
        neuronObj.setState(undefined);
        assert.equal(neuronObj.getState(), 0);
    });

    it("should set a state as a empty and return 0", function () {
        var neuronObj = neuron();
        neuronObj.setState();
        assert.equal(neuronObj.getState(), 0);
    });
});

describe("neuron objects ideal functions", function () {

    it("should set a state several times and return the last ideal index of 0", function () {
        var neuronObj = neuron();
        neuronObj.setState();
        neuronObj.setState(1);
        neuronObj.setState(1);
        assert.equal(neuronObj.getLastIdealIndex(), 0);
    });

    it("should set a state several times and return the last ideal index 1", function () {
        var neuronObj = neuron();
        neuronObj.setState();
        neuronObj.setState();
        neuronObj.setState(1);
        neuronObj.setState(1);
        assert.equal(neuronObj.getLastIdealIndex(), 1);
    });

    it("should set a state several times and return the last ideal index 5", function () {
        var neuronObj = neuron();
        neuronObj.setState();
        neuronObj.setState();
        neuronObj.setState(1);
        neuronObj.setState(1);
        neuronObj.setState();
        neuronObj.setState();
        assert.equal(neuronObj.getLastIdealIndex(), 5);
    });
});

describe("neuron objects action functions", function () {

    it("should add one synapse and return a length of 1", function () {
        var neuronObj = neuron();
        neuronObj.connectSynapse(neuron());
        assert.equal(neuronObj.synapses.length, 1);
    });

    it("should call connectSynapse with no input and return a length of 0", function () {
        var neuronObj = neuron();
        neuronObj.connectSynapse();
        assert.equal(neuronObj.synapses.length, 0);
    });

    it("should call setState on the synapse after setState is called on the neuron and return 1", function () {
        var neuronObj = neuron(),
            synapse = {
                test: 0,
                getState: function () {
                    this.test = 1;
                    return 1;
                }
            };

        neuronObj.connectSynapse(synapse);
        neuronObj.setState(0); // set ideal
        neuronObj.setState(1); // set non-ideal
        assert.equal(synapse.test, 1);
    });

    it("should call setState on each synapse after setState is called on the neuron and return 2", function () {
        var neuronObj = neuron(),
            synapse1 = {
                test: null,
                getState: function () {
                    this.test = 1;
                    return 1;
                }
            },
            synapse2 = {
                test: 0,
                getState: function () {
                    this.test = 1;
                    return 1;
                }
            };

        neuronObj.connectSynapse(synapse1);
        neuronObj.connectSynapse(synapse2);
        neuronObj.setState(0); // set ideal
        neuronObj.setState(1); // set non-ideal
        assert.equal(synapse1.test + synapse2.test, 2);
    });
});
