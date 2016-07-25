/**
 * Created by Samuel on 7/24/2016.
 */

'use strict';

/**
 * Exports ESI functions.
 * Some of these will require a context object to function as expected
 */


/**
 *
 * @param {string} string - input string
 * @param {string} [sep] - Optional separator character
 * @param {number} [max_sep] - Optional maximum number of splits
 */
function $string_split(string, sep, max_sep) {

}

/**
 *
 * @param {array} words
 * @param {string} [sep= ] - Optional separator. Defaults to space
 */
function $join(words, sep) {
  return words.join(sep || ' ');
}

/**
 * Return first index of char in string, or -1
 * @param {string} string
 * @param {string} char - The character to locate;
 */
function $index(string, char) {
  return string.indexOf(char);
}

/**
 * Return last index of char in string, or -1
 * @param {string} string
 * @param {string} char - The character to locate;
 */
function $rindex(string, char) {
  return string.lastIndexOf(char);
}

/**
 * trimLeft
 * @param {string} string
 * @returns {string}
 */
function $lstrip(string) {
  return string.trimLeft();
}

/**
 * trimRight
 * @param {string} string
 * @returns {string}
 */
function $rstrip(string) {
  return string.trimRight();
}

/**
 * trim
 * @param {string} string
 * @returns {string}
 */
function $strip(string) {
  return string.trim();
}

function $replace() {

}

/**
 * Substring function
 * ESI implementation is unique in supporting a negative end param
 * @param {string} s
 * @param {number} i - Starting Index
 * @param {number} [j] - Optional Ending Index
 * @returns {string}
 */
function $substr(s, i, j) {
  if (j !== undefined) {
    var startIndex = i >= 0 ? i : (s.length + i);

    if (j <= 0) {
      return s.substring(startIndex, (s.length + j));
    } else {
      return s.substr(startIndex, j);
    }
  }
  return s.substr(i);
}

/**
 * toLowerCase
 * @param {string} s
 * @returns {string}
 */
function $lower(s) {
  return s.toLowerCase();
}

/**
 * toUpperCase
 * @param {string} s
 * @returns {string}
 */
function $upper(s) {
  return s.toUpperCase();
}

/**
 * Returns a literal dollar sign
 * @returns {string}
 */
function $dollar() {
  return '$';
}

/**
 * Returns a literal double quote
 * @returns {string}
 */
function $dquote() {
  return '"';
}

/**
 * return a literal single quote
 * @returns {string}
 */
function $squote() {
  return "'";
}

/**
 * Convert string to integer.
 * Errors become 0 (zero)
 * @param {string} string
 * @returns {number}
 */
function $int(string) {

  var val = parseInt(string, 10);
  // Handle NaN. Spec says errors become 0
  return val !== val ? 0 : val;
}

/**
 * Convert anything to a string.
 * Return an empty string for null & undefined
 * TODO - Should null & undefined return "null" & "undefined"?
 * @param {*} input
 * @returns {string}
 */
function $str(input) {
  if (input !== null && input !== undefined) {
    return input.toString();
  }

  // Fallback to empty string for bad values
  return '';
}

/**
 * Returns the length of the string or array
 * Provide count of entries in a dictionary
 * Returns undefined for numbers
 * @param {*} input
 * @returns {number|undefined}
 */
function $len(input) {
  // No good way to prevent a dictionary
  if (input.length || input.length === 0) {
    // anything that inherits length
    return input.length;
  } else if (typeof input === 'object') {
    // return length for dictionary objects
    return Object.keys(input).length;
  }

  return undefined;
}

function $bin_int() {

}

/**
 * Splice a value from a list (array)
 * Mutates the original array, returns the spliced value.
 * @param {Array} sequence
 * @param {number} index
 * @returns {Array.<*>}
 */
function $list_delitem(sequence, index) {
  return sequence.splice(index, 1);
}

/**
 * Random Integer
 * @param {number} [ceiling]
 * @returns {number}
 */
function $rand(ceiling) {
  var top = ceiling !== undefined ? ceiling : 100000000;
  var rand = Math.floor(Math.random() * top);

  // TODO - Solve for $last_rand()
  return rand;
}

function $last_rand() {

}

function $is_empty() {

}

function $exists() {

}

function $add_header() {

}

function $set_response_code() {

}

function $set_redirect() {

}

function $add_cachebusting_header() {

}

function $url_encode() {

}

function $url_decode() {

}

function $html_encode() {

}

function $html_decode() {

}

function $base64_encode() {

}

function $base64_decode() {

}

function $digest_md5() {

}

function $digest_md5_hex() {

}

function $time() {

}

function $http_time() {

}

function $strftime() {

}

/*
{
  '$string_split': $string_split,
  '$join': $join,
  '$index': $index,
  '$rindex': $rindex,
  '$lstrip': $lstrip,
  '$rstrip': $rstrip,
  '$strip': $strip,
  '$replace': $replace,
  '$substr': $substr,
  '$lower': $lower,
  '$upper': $upper,
  '$dollar': $dollar,
  '$dquote': $dquote,
  '$squote': $squote,
  '$int': $int,
  '$str': $str,
  '$len': $len,
  '$bin_int': $bin_int,
  '$list_delitem': $list_delitem,
  '$rand': $rand,
  '$last_rand': $last_rand,
  '$is_empty': $is_empty,
  '$exists': $exists,
  '$add_header': $add_header,
  '$set_response_code': $set_response_code,
  '$set_redirect': $set_redirect,
  '$add_cachebusting_header': $add_cachebusting_header,
  '$url_encode': $url_encode,
  '$url_decode': $url_decode,
  '$html_encode': $html_encode,
  '$html_decode': $html_decode,
  '$base64_encode': $base64_encode,
  '$base64_decode': $base64_decode,
  '$digest_md5': $digest_md5,
  '$digest_md5_hex': $digest_md5_hex,
  '$time': $time,
  '$http_time': $http_time,
  '$strftime': $strftime
}
*/

// Commenting out unimplemented functions
module.exports = {
  // '$string_split': $string_split,
  '$join': $join,
  '$index': $index,
  '$rindex': $rindex,
  '$lstrip': $lstrip,
  '$rstrip': $rstrip,
  '$strip': $strip,
  // '$replace': $replace,
  '$substr': $substr,
  '$lower': $lower,
  '$upper': $upper,
  '$dollar': $dollar,
  '$dquote': $dquote,
  '$squote': $squote,
  '$int': $int,
  '$str': $str,
  // '$bin_int': $bin_int,
  '$list_delitem': $list_delitem,
  '$rand': $rand,
  // '$last_rand': $last_rand,
  // '$is_empty': $is_empty,
  // '$exists': $exists,
  // '$add_header': $add_header,
  // '$set_response_code': $set_response_code,
  // '$set_redirect': $set_redirect,
  // '$add_cachebusting_header': $add_cachebusting_header,
  // '$url_encode': $url_encode,
  // '$url_decode': $url_decode,
  // '$html_encode': $html_encode,
  // '$html_decode': $html_decode,
  // '$base64_encode': $base64_encode,
  // '$base64_decode': $base64_decode,
  // '$digest_md5': $digest_md5,
  // '$digest_md5_hex': $digest_md5_hex,
  // '$time': $time,
  // '$http_time': $http_time,
  // '$strftime': $strftime,
  '$len': $len // Moved len to the bottom to avoid trailing commas
};
