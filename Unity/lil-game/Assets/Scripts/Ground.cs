using UnityEngine;

public class Ground : MonoBehaviour
{
	[SerializeField]
	private PlayerController player;

	[SerializeField]
	private float offset;

	void Start() {
		player = GameObject.FindObjectOfType<PlayerController>();
		offset = player.transform.position.z - transform.position.z;
	}

	void Update() {
		transform.position = new Vector3(transform.position.x, transform.position.y, player.transform.position.z - offset);
	}
}
