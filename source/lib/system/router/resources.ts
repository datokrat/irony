export abstract class ReferencedResource {
  /**
   * Constructor. Receives the location of the resource.
   * @param location To be added to the Location header on response
   * @param statusCode the response status code to be sent
   */
  constructor(public location: string, public statusCode: number) { }
}

/**
 * Inform that a new resource was created. Server will 
 * add a Location header and set status to 201
 */
export class NewResource extends ReferencedResource {
	/**
	 * Constructor. Receives the location of the new resource created.
	 * @param location To be added to the Location header on response
	 */
  constructor(location: string) {
    super(location, 201);
  }
}

/**
 * Inform that the request was accepted but is not completed.
 * A Location header should inform the location where the user
 * can monitor his request processing status.
 */
export class RequestAccepted extends ReferencedResource {
	/**
	 * Constructor. Receives the location where information about the 
	 * request processing can be found.
	 * @param location To be added to the Location header on response
	 */
  constructor(location: string) {
    super(location, 202);
  }
}

/**
 * Inform that the resource has permanently
 * moved to a new location, and that future references should use a
 * new URI with their requests.
 */
export class MovedPermanently extends ReferencedResource {
	/**
	 * Constructor. Receives the location where the resource can be found.
	 * @param location To be added to the Location header on response
	 */
  constructor(location: string) {
    super(location, 301);
  }
}

/**
 * Inform that the resource has temporarily
 * moved to another location, but that future references should
 * still use the original URI to access the resource.
 */
export class MovedTemporarily extends ReferencedResource {
	/**
	 * Constructor. Receives the location where the resource can be found.
	 * @param location To be added to the Location header on response
	 */
  constructor(location: string) {
    super(location, 302);
  }
}
