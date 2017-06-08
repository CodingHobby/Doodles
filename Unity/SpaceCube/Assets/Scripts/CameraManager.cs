using UnityEngine;

public class CameraManager : MonoBehaviour {

	public Camera camera;
	private Transform cameraRig;
	private Vector3 prevMousePosition;
	public bool holdToOrbit = false;
	private int orbitSensitivity = 10;
	private float zoomSensitivity = 2f;
	private float minD = 2f;
	private float maxD = 25;
	private float panSpeed = 0.5f;

	void Start() {
		// If the camera component has not been set then we'll set it from the script
		if(camera == null)
			camera = GetComponent<Camera>();
		
		// If we don't have a camera attached then we'll set it to the main camera
		if(camera == null)
			camera = Camera.main;

		if(camera == null)
			return;
		
		cameraRig = camera.transform.parent;
		camera.transform.localRotation = Quaternion.LookRotation(-camera.transform.localPosition);
	}

	void Update() {
		PanCamera();
		OrbitCamera();
		ZoomCamera();
	}

	void PanCamera() {
		Vector3 input = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));

		Vector3 actualChange = input * panSpeed;

		actualChange = Quaternion.Euler(0, camera.transform.rotation.eulerAngles.y, 0) * actualChange;

		Vector3 newPosition = cameraRig.transform.position + actualChange;

		cameraRig.transform.position = newPosition;
	}

	void OrbitCamera() {
		if(Input.GetMouseButtonDown(1)) {
			// The mouse was pressed on this frame
			prevMousePosition = Input.mousePosition;
		}

		if(Input.GetMouseButton(1)) {
			// Holding down the right mouse button
			Vector3 currentMousePosition = Input.mousePosition;
			Vector3 mouseMovement = currentMousePosition - prevMousePosition;
			Vector3 rotationAngles = mouseMovement / orbitSensitivity;

			if(holdToOrbit) {
				rotationAngles *= Time.deltaTime;
			}

			Quaternion theRotation = Quaternion.Euler(rotationAngles.y, -rotationAngles.x, 0);

			camera.transform.RotateAround(cameraRig.position, camera.transform.right, rotationAngles.y);
			camera.transform.RotateAround(cameraRig.position, camera.transform.up, rotationAngles.x);


			// Rotate the camera towards the focal point
			camera.transform.localRotation = Quaternion.LookRotation(-camera.transform.localPosition);

			if(!holdToOrbit) {
				prevMousePosition = currentMousePosition;	
			}
		}
	}

	void ZoomCamera() {
		if(Input.GetAxis("Mouse ScrollWheel") != 0) {
			float delta = Input.GetAxis("Mouse ScrollWheel");

			Vector3 change = camera.transform.localPosition * delta;

			Vector3 newPosition = camera.transform.localPosition - (change * zoomSensitivity);

			newPosition = newPosition.normalized * Mathf.Clamp(newPosition.magnitude, minD, maxD);

			camera.transform.localPosition = newPosition;

			camera.transform.localRotation = Quaternion.LookRotation(-camera.transform.localPosition);
		}
	}
}
