import Tree from "./tree";

/**
 * btree namespace.
 * @type {Object.<string,*>}
 */
export default class Btree extends Tree {
    constructor(order) {
        super();
        this.order = order;
    }

    /**
     * Strictly compares two strings, character by character. No locales, no number extension.
     * @param {string} a
     * @param {string} b
     * @returns {number} -1 if a < b, 1 if a > b, 0 otherwise
     * @expose
     */
    strcmp(a, b) {
        /** @type {number} */
        var ac;
        /** @type {number} */
        var bc;
        for (var i=0; i<a.length; i++) {
            if (i >= b.length) {
                return 1;
            }
            if ((ac = a.charCodeAt(i)) < (bc = b.charCodeAt(i))) {
                return -1;
            } else if (ac > bc) {
                return 1;
            }
            // If same, continue
        }
        return a.length == b.length ? 0 : -1;
    };

    /**
     * Compares two numbers.
     * @param {number} a
     * @param {number} b
     * @returns {number} -1 if a < b, 1 if a > b, 0 otherwise
     * @expose
     */
    numcmp(numA, numB) {
        let [a, b] = [+numA, +numB];
        return a < b ? -1 : (a > b ? 1 : 0);
    };
    
    /**
     * Creates a BTree class using the given order.
     * Note that this method returns a class, not an instance.
     * @param {function(?, ?):number=} compare Compare implementation to use on keys
     * @returns {Function}
     * @expose
     */
    create(order) {
        
        // Validate order
        if (typeof this.order === 'undefined') {
            this.order = 2; // Benchmarks proofed that this is close to the optimum
        } else if (typeof order === 'number') {
            this.order = Math.floor(order);
        } else {
            this.order = parseInt(order, 10);
        }
        if (order < 1) order = 1;
        this.minOrder = order > 1 ? Math.floor(order/2) : 1;

        // Use numcmp by default
        this.compare = (numA, numB) => this.numcmp(numA, numB);
    }
}