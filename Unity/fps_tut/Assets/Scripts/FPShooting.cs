using UnityEngine;

public class FPShooting : MonoBehaviour {

	private GameObject gun;

	public GameObject bulletPrefab;
	private Camera c;
	private float bulletImpulse = 50f;
	private float zoom = 30f;

	void Start () {
		c = Camera.main;
		gun = GameObject.FindGameObjectWithTag("Gun");
	}
	
	void Update () {
		if(Input.GetButtonDown("Fire1")) {
			GameObject bullet = (GameObject)Instantiate(bulletPrefab, gun.transform.position + gun.transform.forward, gun.transform.rotation);
			bullet.GetComponent<Rigidbody>().AddForce(gun.transform.forward * bulletImpulse);
		}

		if(Input.GetButtonDown("Fire2")) {
			c.fieldOfView -= zoom;
		}

		if(Input.GetButtonUp("Fire2")) {
			c.fieldOfView += zoom;
		}
	}
}
