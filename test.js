import ChildCareIcon from '@material-ui/icons/ChildCare';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import FaceIcon from '@material-ui/icons/Face';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PlaceIcon from '@material-ui/icons/Place';


var url = "http://volleyloisir90.free.fr/classementpouleB.htm"


function makeHttpObject() {
  try { return new XMLHttpRequest(); }
  catch (error) { }
  try { return new ActiveXObject("Msxml2.XMLHTTP"); }
  catch (error) { }
  try { return new ActiveXObject("Microsoft.XMLHTTP"); }
  catch (error) { }

  throw new Error("Could not create HTTP request object.");
}

var request = makeHttpObject();
request.open("GET", url, true);
request.send(null);
request.onreadystatechange = function () {
  if (request.readyState == 4)
    alert(request.responseText);
};

console.log(request)