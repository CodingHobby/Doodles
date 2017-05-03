using UnityEngine;

public class PlatformDestroyer : MonoBehaviour {

	public GameObject PlatformDestructionPoint;

	void Start () {
		PlatformDestructionPoint = GameObject.Find("PlatformDestructionPoint");
	}
	
	void Update () {
		if(transform.position.x < PlatformDestructionPoint.transform.position.x) {
			// Destroy(gameObject);
			gameObject.SetActive(false);
		}
	}
}
