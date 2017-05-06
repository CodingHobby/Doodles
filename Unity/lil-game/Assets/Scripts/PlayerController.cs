using System.Collections;
using UnityEngine.SceneManagement;
using UnityEngine;

public class PlayerController : MonoBehaviour {

	public float speedZ;
	public float turningSpeed;
	public Rigidbody rb;
	
	void Update() {
		if (transform.position.y < 0.9f) {
			StartCoroutine("Respawn");
		}
	}

	private void OnCollisionEnter(Collision collision) {
		if(collision.collider.tag == "Obstacle") {
			StartCoroutine("Respawn");
		}
	}

	public IEnumerator Respawn() {
		GetComponentInChildren<PlayerMotor>().enabled = false;
		yield return new WaitForSeconds(1f);
		SceneManager.LoadScene(SceneManager.GetActiveScene().name);
	}
}
