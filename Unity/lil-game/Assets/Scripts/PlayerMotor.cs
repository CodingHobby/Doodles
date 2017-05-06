using UnityEngine;

[RequireComponent(typeof(Rigidbody))]
public class PlayerMotor : MonoBehaviour {

	public Rigidbody rb;
	public float speedZ = 100f;
	public float turningSpeed = 50f;
	
	void Update () {
		rb.velocity = new Vector3(Input.GetAxisRaw("Horizontal") * turningSpeed, 0, speedZ);
	}
}
