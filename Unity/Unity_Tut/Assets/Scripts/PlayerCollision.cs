using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerCollision : MonoBehaviour {

	public PlayerMovement movement;

	void OnCollisionEnter(Collision collision) {
		string tag = collision.collider.tag;

		switch(tag) {
			case "Obstacle":
				movement.enabled = false;
				FindObjectOfType<GameManager>().EndGame();
				break;
		}
	}
}
