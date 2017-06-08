using UnityEngine;
using UnityEngine.UI;
using System;

public class ComponentKeybindDialog : MonoBehaviour {
	KeybindableComponent keybindableComponent;

	public void OpenDialog(KeybindableComponent kc) {
		this.keybindableComponent = kc;
		gameObject.SetActive(true);

		transform.Find("Keybind").GetComponent<Text>().text = keybindableComponent.key.ToString();
	}


	void Update() {
		if(Input.GetKeyUp(KeyCode.Escape)) {
			gameObject.SetActive(false);
		}
		// While the window is open change the "keycode" text
		foreach(KeyCode keyCode in Enum.GetValues(typeof(KeyCode))) {
			if(keyCode != KeyCode.Mouse0 && keyCode != KeyCode.Mouse1 && keyCode != KeyCode.Mouse2) {
				if(Input.GetKeyDown(keyCode)) {
					Text keybind = gameObject.transform.Find("Keybind").GetComponent<Text>();
					keybind.text = keyCode.ToString();
				}	
			}
		}
		// And on keyup we want to set the keybind
		foreach(KeyCode keyCode in Enum.GetValues(typeof(KeyCode))) {
			if(keyCode != KeyCode.Mouse0 && keyCode != KeyCode.Mouse1 && keyCode != KeyCode.Mouse2) {
				if(Input.GetKeyUp(keyCode)) {
					keybindableComponent.key = keyCode;
					gameObject.SetActive(false);
					return;
				}	
			}
		}
	}
}
