export class TestFramework {
    constructor(resultsElement, summaryElement) {
        this.resultsElement = resultsElement;
        this.summaryElement = summaryElement;
        this.passed = 0;
        this.failed = 0;
        this.currentSuite = null;
    }

    describe(name, fn) {
        const suiteDiv = document.createElement('div');
        suiteDiv.className = 'suite';
        const title = document.createElement('div');
        title.className = 'suite-title';
        title.textContent = name;
        suiteDiv.appendChild(title);
        this.resultsElement.appendChild(suiteDiv);
        
        this.currentSuite = suiteDiv;
        try {
            fn();
        } catch (e) {
            this.logError("Suite Error", e);
        }
        this.currentSuite = null;
        this.updateSummary();
    }

    async it(name, fn) {
        const testDiv = document.createElement('div');
        testDiv.className = 'test';
        testDiv.textContent = name;
        this.currentSuite.appendChild(testDiv);

        try {
            await fn();
            testDiv.classList.add('pass');
            testDiv.textContent += " ✅";
            this.passed++;
        } catch (e) {
            testDiv.classList.add('fail');
            testDiv.textContent += " ❌";
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error';
            errorDiv.textContent = e.stack || e.toString();
            testDiv.appendChild(errorDiv);
            this.failed++;
            console.error(e);
        }
        this.updateSummary();
    }

    expect(actual) {
        return {
            toBe: (expected) => {
                if (actual !== expected) {
                    throw new Error(`Expected ${expected} but got ${actual}`);
                }
            },
            toEqual: (expected) => {
                if (JSON.stringify(actual) !== JSON.stringify(expected)) {
                    throw new Error(`Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`);
                }
            },
            toBeTruthy: () => {
                if (!actual) {
                    throw new Error(`Expected ${actual} to be truthy`);
                }
            },
            toBeFalsy: () => {
                if (actual) {
                    throw new Error(`Expected ${actual} to be falsy`);
                }
            },
            toThrow: (errorType) => {
                try {
                    actual();
                } catch (e) {
                    if (errorType && !(e instanceof errorType)) {
                         throw new Error(`Expected error of type ${errorType.name} but got ${e.constructor.name}`);
                    }
                    return;
                }
                throw new Error(`Expected function to throw`);
            }
        };
    }

    logError(context, error) {
        const div = document.createElement('div');
        div.className = 'test fail';
        div.innerHTML = `<strong>${context}</strong><br/><pre>${error.stack || error}</pre>`;
        if (this.currentSuite) {
            this.currentSuite.appendChild(div);
        } else {
            this.resultsElement.appendChild(div);
        }
        this.failed++;
    }

    updateSummary() {
        this.summaryElement.innerHTML = `Total: ${this.passed + this.failed} | <span class="pass-count">Passed: ${this.passed}</span> | <span class="fail-count">Failed: ${this.failed}</span>`;
    }
}
