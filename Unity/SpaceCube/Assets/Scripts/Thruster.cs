using UnityEngine;

public class Thruster : KeybindableComponent {
	public float thrusterSpeed = 10f;
	Rigidbody shipRb;

	void Start() {
		shipRb = this.transform.root.GetComponent<Rigidbody>();
	}


	void FixedUpdate() {
		if(!shipRb.isKinematic) {
			if(Input.GetKey(key)) {

				Vector3 force = -transform.forward * thrusterSpeed;
				shipRb.AddForceAtPosition(force, transform.position);
				SetParticles(true);
			} else {
				SetParticles(false);
			}
		} else {
			SetParticles(false);
		}
	}

	void SetParticles(bool enabled) {
		ParticleSystem.EmissionModule em = GetComponentInChildren<ParticleSystem>().emission;
		em.enabled = enabled;
	}
}
