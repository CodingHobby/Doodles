using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BulletThermalDetonator : MonoBehaviour {

	private float lifeSpan = 3f;
	public GameObject fireEffect;

	private void Update() {
		lifeSpan -= Time.deltaTime;
		if(lifeSpan <= 0) {
			Explode();
		}
	}

	void OnCollisionEnter(Collision collision) {
		if (collision.gameObject.tag == "Enemy") {
			Explode();
			collision.gameObject.tag = "Untagged";
			Destroy(collision.gameObject);
			Instantiate(fireEffect, new Vector3(collision.gameObject.transform.position.x, collision.gameObject.transform.position.y, collision.gameObject.transform.position.z), Quaternion.identity);
		}
	}

	private void Explode() {
		Destroy(gameObject);
	}
}
