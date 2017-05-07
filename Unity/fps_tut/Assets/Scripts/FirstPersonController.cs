using UnityEngine;

[RequireComponent(typeof(CharacterController))]
public class FirstPersonController : MonoBehaviour {
	
	public float movementSpeed = 10f;
	public float turningSpeed = 4f;

	private CharacterController cc;
	
	private float rotXLimit = 60f;
	private float verticalRot = 0f;
	
	private float velY = 0f;
	private float jumpSpeed = 5f;

	void Start () {
		cc = gameObject.GetComponent<CharacterController>();
		Cursor.lockState = CursorLockMode.Locked;
		Cursor.visible = false;
	}
	
	void Update () {
		// Check for vert and horizontal axis movement
		float rotY = Input.GetAxisRaw("Mouse X");
		transform.Rotate(0, rotY * turningSpeed, 0);
		
		float rotX = Input.GetAxisRaw("Mouse Y");

		Camera camera = Camera.main;

		verticalRot -= rotX * turningSpeed;
		
		float desiredRotX = Mathf.Clamp(verticalRot, -rotXLimit, rotXLimit);

		camera.transform.localRotation = Quaternion.Euler(desiredRotX, 0, 0);
		

		// Check for vertical and horizontal axis movement
		float speedZ = Input.GetAxisRaw("Vertical") * movementSpeed;
		float speedX = Input.GetAxisRaw("Horizontal") * movementSpeed;

		// This accelerates the gravity, making it an acceleration instead of a velocity
		velY += Physics.gravity.y * Time.deltaTime;

		if(Input.GetButtonDown("Jump") && cc.isGrounded) {
			velY = jumpSpeed;
		}

		// We need to use gravity, since we're also using Move instead of SimpleMove
		Vector3 speedV = new Vector3(speedX, velY, speedZ);

		speedV = transform.rotation * speedV;
		
		cc.Move(speedV * Time.deltaTime);
	}
}
