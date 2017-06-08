using UnityEngine;

// Responsible for detecting what cube the mouse is over and handle clicks
public class MouseManager : MonoBehaviour {
	public GameObject objectPrefab;
	public LayerMask snapPointLayerMask;
	public ComponentKeybindDialog componentKeybindDialog;
	public GameObject shipRoot;

	void Update() {
		if(Input.GetMouseButtonDown(0)) {
			LeftClickActions();
		}

		if(Input.GetMouseButtonDown(1)) {
			RightClickActions();
		}
	}

	void LeftClickActions() {
		// Is the mouse over a cube?
		// Cast a ray from the camera to the mouse position
		Collider theCollider = DoRaycast();

		// Didn't hit anything
		if(theCollider == null)
			return;
		
		// Physics.Raycast returns whether the ray hits something, and can save the hit information in the "out" parameter
		// Did we hit a snap point?
		// all snap points are on the SnapPoint physics layer

		// We need to use a bitwise operator, since layers are stored as a sequence of bits

		int maskForHitObject = 1 << theCollider.gameObject.layer;

		if((maskForHitObject & snapPointLayerMask) != 0) {
			// hitInfo.normal is a vector that points away from the face
			Vector3 spawnSpot = theCollider.transform.position;
			// We need to rotate the object based on the rotation of the SnapPoint
			Quaternion spawnRot = theCollider.transform.rotation;

			GameObject go = (GameObject)Instantiate(
				                objectPrefab, 
				                spawnSpot,	
				                spawnRot
			                );
			go.transform.SetParent(theCollider.transform);

			// Calculate mass from the size of the colliders on the parts
			Collider[] cols = go.transform.GetComponentsInChildren<Collider>();
			float mass = 0;
			foreach(Collider col in cols) {
				int maskForThisCollider = 1 << col.gameObject.layer;
				// Confirming it's not a snapPoint
				if((maskForThisCollider & snapPointLayerMask) == 0) {
					// This is not a snap point, so we can add it to the mass
					float vol = col.bounds.size.x * col.bounds.size.y * col.bounds.size.z;
					mass += vol;	
				}
			}

			theCollider.transform.GetComponentInParent<Rigidbody>().mass += mass;

			// Disable the SnapPoint graphic
			if(theCollider.gameObject.GetComponent<Renderer>() != null) {
				theCollider.gameObject.GetComponent<Renderer>().enabled = false;	
			}
			if(theCollider.gameObject.GetComponent<Collider>() != null) {
				theCollider.gameObject.GetComponent<Collider>().enabled = false;
			}
		}
	}

	Collider DoRaycast() {
		Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		RaycastHit hitInfo;
		if(Physics.Raycast(ray, out hitInfo)) {
			return hitInfo.collider;
		}
		return null;
	}

	void RightClickActions() {
		Collider theCollider = DoRaycast();
		if(theCollider == null)
			return;

		// We have clicked something. Is it have a KeybindableComponent?
		// We need to check the associated ship part of the object with the collider, considering how we assemble the hierarchy
		GameObject shipPart = FindShipPart(theCollider);
		if(shipPart == null)
			return;
		
		KeybindableComponent kc = shipPart.GetComponent<KeybindableComponent>();
		if(kc == null)
			return;
		componentKeybindDialog.OpenDialog(kc);
	}

	GameObject FindShipPart(Collider collider) {
		Transform curr = collider.transform;
		while (curr != null) {
			if(curr.gameObject.tag == "ShipPart") {
				return curr.gameObject;
			} else {
				curr = curr.parent;
			}
		}
		return null;
	}

	void RemovePart(GameObject go) {
		// Make sure to re-enable the snapPoints we are attached to
		if(gameObject.transform.parent.GetComponent<Renderer>() != null) {
			gameObject.transform.parent.GetComponent<Renderer>().enabled = true;	
		}
		if(gameObject.transform.parent.GetComponent<Collider>() != null) {
			gameObject.transform.parent.GetComponent<Collider>().enabled = true;	
		}
		Destroy(go);
	}

	public void SetMode_Build() {
		// Show all the snapPoint nodes
		SetSnapPointEnabled(shipRoot.transform, true);
		// Unlock the camera
		Camera.main.transform.parent.SetParent(null);
		Camera.main.transform.parent.localPosition = Vector3.zero;
		shipRoot.transform.position = Vector3.zero;
	}

	public void SetMode_Test() {
		// Hide all the snapPoint nodes
		SetSnapPointEnabled(shipRoot.transform, false);
		// Tell the camera to lock to the ship's root
		Camera.main.transform.parent.SetParent(shipRoot.transform);
		Camera.main.transform.parent.localPosition = Vector3.zero;
	}

	void SetSnapPointEnabled(Transform t, bool setToActive) {
		int maskForHitObject = 1 << t.gameObject.layer;
		// This is a snapPoint
		if((maskForHitObject & snapPointLayerMask) != 0) {
			if(setToActive)
				t.gameObject.SetActive(setToActive);
			else {
				// Only inactivate the SnapPoint if it has no children, so it's visible
				if(t.childCount == 0) {
					t.gameObject.SetActive(false);
					return;
				}
			}
		}
		// Loop to every object child (only if setToActive is true)
		for(int i = 0; i < t.childCount; i++) {
			SetSnapPointEnabled(t.GetChild(i), setToActive);
		}
	}
}
