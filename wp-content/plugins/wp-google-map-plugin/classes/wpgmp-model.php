<?php
/**
 * Controller class
 * @author Flipper Code<hello@flippercode.com>
 * @version 4.1.6
 * @package Maps
 */

if ( ! class_exists( 'WPGMP_Model' ) ) {

	/**
	 * Controller class to display views.
	 * @author: Flipper Code<hello@flippercode.com>
	 * @version: 4.1.6
	 * @package: Maps
	 */

	class WPGMP_Model extends Flippercode_Factory_Model{


		function __construct() {

			parent::__construct(WPGMP_MODEL,'WPGMP_Model_');

		}

	}
	
}
