// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/56295f5058cac7ae458540423c50ac2dcf9fc711/response-time/response-time.d.ts
declare module "response-time" {
    import express = require('express');

    /**
     * Response time header for node.js
     * Returns middleware that adds a X-Response-Time header to responses.
     */
    function responseTime(options?: {
        /**
        * The fixed number of digits to include in the output, which is always in milliseconds, defaults to 3 (ex: 2.300ms).
        */
        digits?: number;
        /**
         * The name of the header to set, defaults to X-Response-Time.
         */
        header?: string;
        /**
         * Boolean to indicate if units of measurement suffix should be added to the output, defaults to true (ex: 2.300ms vs 2.300).
         */
        suffix?: boolean;
    }): express.RequestHandler;
    
    export = responseTime;
}
