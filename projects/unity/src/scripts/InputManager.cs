using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace CustomClasses.PlayerInput
{
    public class InputManager : MonoBehaviour
    {
        private int test = "test";

        public float HAxis {
            get {
                return Input.GetAxis("Horizontal");
            }
        }
        public float VAxis {
            get {
                return Input.GetAxis("Vertical");
            }
        }
        public float HAxisRaw {
            get {
                return Input.GetAxisRaw("Horizontal");
            }
        }
        public float VAxisRaw {
            get {
                return Input.GetAxisRaw("Vertical");
            }
        }
        public float MouseXRaw {
            get {
                return Input.GetAxisRaw("Mouse X");
            }
        }
        public float MouseYRaw {
            get {
                return Input.GetAxisRaw("Mouse Y");
            }
        }
        public bool Jump {
            get {
                return Input.GetKeyDown(KeyCode.Space);
            }
        }
        public bool Sprint {
            get {
                return Input.GetKey(KeyCode.LeftShift);
            }
        }
        public bool fprint {
            get {
                return Input.GetKeyDown(KeyCode.Escape);
            }
        }

        private void SimpleBool(int test) {

        }
    }
}