using System.Collections;
using UnityEngine;

public class FirstPersonController : MonoBehaviour {
	private CharacterController cc;
	[SerializeField]
	private float movementSpeed = 5f;
	[SerializeField]
	private float mouseSpeed = 3f;
	float verticalRotation = 0f;
	float verticalVelocity = 0;
	float jumpSpeed = 7f;

	void Start() {
		Cursor.visible = false;
		Cursor.lockState = CursorLockMode.Locked;
		this.cc = this.GetComponent<CharacterController>();
	}

	void Update() {
		// Mouse rotation up-down
		this.verticalRotation -= Input.GetAxis("Mouse Y") * this.mouseSpeed;
		this.verticalRotation = Mathf.Clamp(this.verticalRotation, -60f, 60f);
		Camera.main.transform.localRotation = Quaternion.Euler(this.verticalRotation, 0, 0);
		// Mouse rotation right-left
		float yRot = Input.GetAxis("Mouse X") * this.mouseSpeed;
		this.transform.Rotate(new Vector3(0, yRot, 0));
		// Movement
		float zMove = Input.GetAxisRaw("Vertical") * this.movementSpeed;
		float xMove = Input.GetAxisRaw("Horizontal") * this.movementSpeed;
		this.verticalVelocity += Physics.gravity.y * Time.deltaTime;
		Vector3 move = this.transform.rotation * new Vector3(xMove, this.verticalVelocity, zMove);
		// Jump
		if(Input.GetButtonDown("Jump") && cc.isGrounded) {
			verticalVelocity = this.jumpSpeed;
		}
		this.cc.Move(move * Time.deltaTime);
	}
}
