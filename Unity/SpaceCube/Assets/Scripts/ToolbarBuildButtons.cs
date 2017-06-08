using UnityEngine;
using UnityEngine.UI;

public class ToolbarBuildButtons : MonoBehaviour {
	public GameObject buildButtonPrefab;
	public GameObject[] shipPartPrefabs;

	void Start() {
		MouseManager mouseManager = GameObject.FindObjectOfType<MouseManager>();

		// Populate the button list
		foreach(GameObject part in shipPartPrefabs) {
			GameObject buttonGo = (GameObject)Instantiate(buildButtonPrefab, transform);
			Text label = buttonGo.GetComponentInChildren<Text>();
			label.text = part.name;

			Button button = buttonGo.GetComponent<Button>();

			GameObject currentPart = part;

			button.onClick.AddListener(() => {
				mouseManager.objectPrefab = currentPart;
			});
		}
	}

	void Update() {
		
	}
}
